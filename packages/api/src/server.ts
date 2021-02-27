import bcrypt from 'bcrypt'
import express from 'express'
import bodyParser from 'body-parser'
import OAuthServer from 'express-oauth-server'
import {Sequelize} from 'sequelize'
import winston from 'winston'

import { default as AccessToken, init as initAccessToken } from './models/accesstoken'
import { default as Client, init as initClient } from './models/client'
import { default as Publisher, init as initPublisher } from './models/publisher'
import { default as Staff, init as initStaff } from './models/staff'
import { default as User, init as initUser } from './models/user'

import genUserRouter from './http/routes/user'

import OAuthModel from './oauth'

export default class Server {
	public readonly app: express.Express
	public readonly db: Sequelize
	public readonly logger: winston.Logger
	private readonly oauth: OAuthServer

	constructor() {
		this.app = express()
		this.db = new Sequelize(`mariadb://expidus:${process.env.DB_PASSWORD}@db/expidus`)
		this.logger = winston.createLogger({
			level: process.env.NODE_ENV == 'development' ? 'debug' : 'info',
			format: winston.format.combine(
				winston.format.colorize(),
				winston.format.splat(),
				winston.format.simple()
			),
			transports: [ new winston.transports.Console() ]
		})

		this.app.use((req, res, next) => {
			this.logger.debug(`receving request from ${req.protocol}://${req.hostname}${req.originalUrl} (${req.method})`)
			next()
		})

		this.oauth = new OAuthServer({
			model: new OAuthModel(this)
		})
		this.app.use(bodyParser.json())
		this.app.use(bodyParser.urlencoded({ extended: false }))

		this.app.post('/v1/user/auth', this.oauth.authenticate())
		this.app.post('/v1/user/token', this.oauth.token())

		this.app.use('/v1/user', genUserRouter(this))
	}

	start() {
		this.logger.debug('start() - beginning server bootup...')
		return new Promise((resolve, reject) => {
			this.logger.info('start() - connecting to database')
			this.db.authenticate().then(() => {
				this.logger.info('start() - connected to database sucessfully')

				initAccessToken({ sequelize: this.db, tableName: 'accessTokens' })
				initClient({ sequelize: this.db, tableName: 'clients' })
				initPublisher({ sequelize: this.db, tableName: 'publishers' })
				initStaff({ sequelize: this.db, tableName: 'staff' })
				initUser({ sequelize: this.db, tableName: 'users' })

				User.hasMany(AccessToken, {
					sourceKey: 'uuid',
					foreignKey: 'uuid',
					as: 'accessToken'
				})

				User.hasMany(Publisher, {
					sourceKey: 'uuid',
					foreignKey: 'owner_uuid',
					as: 'publishers'
				})

				const force = false
				User.sync({ force }).then(() => Publisher.sync({ force }))
					.then(() => AccessToken.sync({ force }))
					.then(() => Client.sync({ force }))
					.then(() => Staff.sync({ force }))
					.then(() => {	
						this.app.listen(3000, () => {
							this.logger.debug('start() - server is online')
							resolve(this)
						})
					}).catch((error) => {
						this.logger.error('start() - failed to sync database: ' + error.toString())
						reject(error)
					})
			}).catch((error) => {
				this.logger.error('start() - failed to connect to database: ' + error.toString())
				reject(error)
			})
		})
	}
}

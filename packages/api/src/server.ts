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

export default class Server {
	public readonly app: express.Express
	public readonly db: Sequelize
	public readonly logger: winston.Logger
	private readonly oauth: OAuthServer

	constructor() {
		this.app = express()
		this.db = new Sequelize('mariadb://expidus:8gpPQ9adBlIwLV6pJypBvf2HKMSba0O@db/expidus')
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
			model: {
				getAccessToken: async (token) => {
					const access_token = await AccessToken.findOne({
						where: { token }
					})

					const user = await User.findOne({
						where: { uuid: access_token.get('uuid') }
					})

					const client = await Client.findOne({
						where: { id: access_token.get('client_id') }
					})

					return {
						accessToken: access_token.get('token'),
						accessTokenExpiresAt: access_token.get('expires'),
						scope: access_token.get('scope'),
						client: {
							id: client.id,
							grants: client.grants
						},
						user
					}
				},
				getClient: async (client_id, client_secret) => {
					const client = await Client.findOne({
						where: { id: client_id, secret: client_secret }
					})

					if (!client) throw new Error('Client does not exist')

					return {
						id: client.id,
						grants: client.grants
					}
				},
				getUser: async (username, pword) => {
					const user = await User.findOne({
						where: { username }
					})

					/* Check if user exists */
					if (!user) {
						return false
					}

					/* Compare password */
					if (!bcrypt.compareSync(pword, user.get('password'))) {
						return false
					}

					return user
				},
				saveToken: async (token, client, user) => {
					const access_token = await AccessToken.create({
						token: token.accessToken,
						expires: token.accessTokenExpiresAt,
						scope: token.scope,
						uuid: user.uuid,
						client_id: client.id
					})

					const the_client = await Client.findOne({
						where: { id: client.id }
					})
					
					return {
						accessToken: access_token.get('token'),
						accessTokenExpiresAt: access_token.get('expires'),
						scope: access_token.get('scope'),
						client: {
							id: the_client.id,
							grants: the_client.grants
						},
						user: (await User.findOne({ where: { uuid: client.id } })) as object
					}
				},
				verifyScope: async (token, scope) => {
					const access_token = await AccessToken.findOne({
						where: { token }
					})
					if (!access_token) throw new Error('Access token does not exist')
					return access_token.scope == scope
				}
			}
		})
		this.app.use(bodyParser.json())
		this.app.use(bodyParser.urlencoded({ extended: false }))

		this.app.post('/v1/user/auth', this.oauth.authenticate())
		this.app.post('/v1/user/token', this.oauth.token())

		this.app.post('/v1/user/register', (req, res) => {
			const { username, password, birthdate, email } = req.body;
			if (!username) {
				res.json({ error: 'Missing username' })
				return;
			}
			if (!password) {
				res.json({ error: 'Missing password' })
				return;
			}
			if (!birthdate) {
				res.json({ error: 'Missing birthdate' })
				return;
			}
			if (!email) {
				res.json({ error: 'Missing email' })
				return;
			}
			User.findOne({
				where: { username }
			}).then((user) => {
				if (user) throw new Error('User already exists')
				return User.create({
					username,
					password,
					birthdate,
					email
				})
			}).then((user: User) => res.json({ uuid: user.uuid, email: user.email, birthdate: user.birthdate }))
			.catch((err: Error) => {
				res.json({ name: err.name, error: err.message })
			})
		})
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

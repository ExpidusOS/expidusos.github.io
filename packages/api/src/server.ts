import express from 'express'
import {Sequelize} from 'sequelize'
import winston from 'winston'

export default class Server {
	public readonly app: express.Express
	public readonly db: Sequelize
	public readonly logger: winston.Logger

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
		
		this.app.get('/.well-known/acme-challenge/bXBt9FbUU4XM2Q78dubmvltvs_axFnspWn-DBHkiDtw', (req, res) => {
			res.send('bXBt9FbUU4XM2Q78dubmvltvs_axFnspWn-DBHkiDtw.VrZ7LJVJB03-1KZ-u64lLy2psx_fQoH8FKNZ8FZxphI')
		})
	}

	start() {
		this.logger.debug('start() - beginning server bootup...')
		return new Promise((resolve, reject) => {
			this.logger.info('start() - connecting to database')
			this.db.authenticate().then(() => {
				this.logger.info('start() - connected to database sucessfully')
				this.app.listen(3000, () => {
					this.logger.debug('start() - server is online')
					resolve(this)
				})
			}).catch((error) => {
				this.logger.error('start() - failed to connect to database: ' + error.toString())
				reject(error)
			})
		})
	}
}

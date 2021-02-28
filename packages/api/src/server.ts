import { sequelize } from './database'
import winston from './providers/winston'
import app from './http/app'

export default class Server {
	constructor() {
	}

	async start() {
		winston.debug('beginning server bootup...')

		winston.info('connecting to database')
		await sequelize.authenticate()
		await sequelize.sync({ force: true }) // TODO: Migrations

		winston.info('connected to database sucessfully')

		app.listen(3000, () => {
			winston.info('server is online')
		})
	}
}

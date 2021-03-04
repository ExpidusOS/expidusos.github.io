import { sequelize } from './database'
import waitOn from 'wait-on'
import winston from './providers/winston'
import app from './http/app'
import config from './config'

export default class Server {
	constructor() {
	}

	async start(): void {
		winston.debug('beginning server bootup...')

		winston.info('connecting to database')
		if (config.database.connection !== 'sqlite::memory') {
			await waitOn({
				resources: [
					'tcp:db:3306'
				]
			})
		}
		await sequelize.authenticate()
		await sequelize.sync({ force: false }) // TODO: Migrations

		winston.info('connected to database sucessfully')

		app.listen(3000, () => {
			winston.info('server is online')
		})
	}
}

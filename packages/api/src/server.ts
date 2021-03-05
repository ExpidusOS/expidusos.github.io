import { sequelize } from './database'
import waitOn from 'wait-on'
import Client from './database/models/client'
import winston from './providers/winston'
import app from './http/app'
import config from './config'

export default class Server {
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

		for (const client_config of config.clients) {
			winston.debug(`Syncing configuration client ${client_config.id}`)
			const client = await Client.findOrCreate({
				where: { id: client_config.id },
				defaults: client_config
			})
			await client[0].update(client_config)
		}

		winston.info('connected to database sucessfully')

		app.listen(3000, () => {
			winston.info('server is online')
		})
	}
}

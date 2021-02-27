import { Express } from 'express'
import { Sequelize } from 'sequelize'
import { Logger } from 'winston'

export default class DIContainer {
	public readonly app: Express
	public readonly db: Sequelize
	public readonly logger: Logger

	constructor(
		app: Express,
		logger: Logger,
		db: Sequelize
	) {
		this.app = app
		this.logger = logger
		this.db = db
	}
}

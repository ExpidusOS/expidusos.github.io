import { Sequelize } from 'sequelize'
import AccessToken from './models/accesstoken'
import Client from './models/client'
import Publisher from './models/publisher'
import Staff from './models/staff'
import User from './models/user'
import config from '../config'

export const models = {
	AccessToken,
	Client,
	Publisher,
	Staff,
	User
}

export const sequelize = new Sequelize(config.database.connection)

Object
	.values(models)
	.forEach(model => model.initializeModel(sequelize))

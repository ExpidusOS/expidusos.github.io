import { Sequelize, Model, DataTypes } from 'sequelize'
import { default as User } from './user.ts'

export default class Publisher extends Model {
	public uuid!: string;
	public owner_uuid!: string;
	public name!: string;
	public email!: string;
	public desc!: string;
	public homepage!: string;
	public trusted!: boolean;
}

export function init(opts: any): Model {
	return Publisher.init({
		uuid: {
			type: DataTypes.UUID,
			allowNull: false,
			primaryKey: true,
			unique: true
		},
		owner_uuid: {
			type: DataTypes.UUID,
			allowNull: false,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: { isEmail: true }
		},
		desc: {
			type: DataTypes.STRING,
			allowNull: true
		},
		homepage: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: { isUrl: true }
		},
		trusted: {
			type: DataTypes.BOOLEAN
		}
	}, opts)
}

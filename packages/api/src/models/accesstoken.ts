import { Sequelize, Model, DataTypes } from 'sequelize'
import { default as User } from './user.ts'
import JWT from 'jsonwebtoken'

export default class AccessToken extends Model {
	public token!: string;
	public uuid!: string;
	public expires!: Date;
	public scope!: string;
	public client_id!: string;
}

export function init(opts: any): Model {
	return AccessToken.init({
		token: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true
		},
		uuid: {
			type: DataTypes.UUID,
			allowNull: false
		},
		expires: {
			type: DataTypes.DATE,
			allowNull: false
		},
		scope: {
			type: DataTypes.STRING,
			allowNull: true
		},
		client_id: {
			type: DataTypes.UUID,
			allowNull: false
		}
	}, opts)
}

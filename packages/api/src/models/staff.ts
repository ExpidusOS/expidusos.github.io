import { Sequelize, DataTypes, Model } from 'sequelize'
import bcrypt from 'bcrypt'

const SALT_ROUNDS = 10

export default class Staff extends Model {
	public id!: number;
	public uuid!: string;
	public password!: string;
	public role!: string;
}

export function init(opts: any): Model {
	return Staff.init({
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			unique: true,
			autoIncrement: true
		},
		uuid: {
			type: DataTypes.UUID,
			allowNull: false
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			set(value) {
				const salt = bcrypt.genSaltSync(SALT_ROUNDS)
				const hash = bcrypt.hashSync(value, salt)
				this.setDataValue('password', hash)
			}
		},
		role: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, opts)
}

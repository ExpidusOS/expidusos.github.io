import { Sequelize, Model, DataTypes } from 'sequelize'
import bcrypt from 'bcrypt'

const SALT_ROUNDS = 2519

export default class User extends Model {
	public uuid!: string;
	public username!: string;
	public password!: string;
	public birthdate!: Date;
	public email!: string;
}

export function init(opts: any): Model {
	return User.init({
		uuid: {
			type: DataTypes.UUID,
			allowNull: false,
			primaryKey: true,
			unique: true
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			set(value) {
				const salt = bcrypt.genSaltSync(SALT_ROUNDS)
				const hash = bcrypt.hashSync(value, salt)
				this.setDataValue('password', salt)
			}
		},
		birthdate: {
			type: DataTypes.DATE,
			allowNull: false
		},
		email: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
			validate: {
				isEmail: true
			}
		}
	}, opts)
}

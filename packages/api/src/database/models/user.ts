import { Sequelize, Model, DataTypes, HasManyGetAssociationsMixin, HasManyAddAssociationMixin, HasManyHasAssociationMixin, HasManyCountAssociationsMixin, HasManyCreateAssociationMixin, Association } from 'sequelize'
import Publisher from './publisher'
import AccessToken from './accesstoken'
import bcrypt from 'bcrypt'

const SALT_ROUNDS = 10

export default class User extends Model {
	public uuid!: string
	public username!: string
	public password!: string
	public birthdate!: Date
	public email!: string

	public getPublishers!: HasManyGetAssociationsMixin<Publisher>
	public addPublisher!: HasManyAddAssociationMixin<Publisher, string>
	public hasPublisher!: HasManyHasAssociationMixin<Publisher, string>
	public countPublishers!: HasManyCountAssociationsMixin
	public createPublisher!: HasManyCreateAssociationMixin<Publisher>
	public readonly publishers?: Publisher[]

	public getAccessTokens!: HasManyGetAssociationsMixin<AccessToken>
	public addAccessToken!: HasManyAddAssociationMixin<AccessToken, string>
	public hasAccessToken!: HasManyHasAssociationMixin<AccessToken, string>
	public countAccessTokens!: HasManyCountAssociationsMixin
	public createAccessToken!: HasManyCreateAssociationMixin<AccessToken>
	public readonly accessTokens?: AccessToken[]

	public static associations: {
		accessTokens: Association<User, AccessToken>;
		publishers: Association<User, Publisher>;
	}

	static initializeModel(sequelize: Sequelize): Model {
		return User.init({
			uuid: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
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
					this.setDataValue('password', hash)
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
		}, {
			sequelize,
			modelName: 'user'
		})

		User.hasMany(AccessToken, {
			sourceKey: 'uuid',
			foreignKey: 'uuid',
			as: 'accessToken'
		})

		User.hasMany(Publisher, {
			sourceKey: 'uuid',
			foreignKey: 'owner_uuid',
			as: 'publishers'
		})
	}
}

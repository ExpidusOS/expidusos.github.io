import { Sequelize, Model, DataTypes } from 'sequelize'

export default class AuthCode extends Model {
	public code!: string;
	public expires!: Date;
	public scope!: string;
	public uuid!: string;
	public client_id!: string;
	public redirect!: string;

	static initializeModel(sequelize: Sequelize): Model {
		return AuthCode.init({
			code: {
				type: DataTypes.STRING,
				allowNull: false,
				primaryKey: true
			},
			expires: {
				type: DataTypes.DATE,
				allowNull: false
			},
			scope: {
				type: DataTypes.STRING,
				allowNull: true
			},
			uuid: {
				type: DataTypes.UUID,
				allowNull: false
			},
			client_id: {
				type: DataTypes.UUID,
				allowNull: false
			},
			redirect: {
				type: DataTypes.STRING,
				allowNull: false
			}
		}, {
			sequelize,
			modelName: 'authCode'
		})
	}
}

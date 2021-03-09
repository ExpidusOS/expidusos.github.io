import { Sequelize, Model, DataTypes } from 'sequelize'

export default class Application extends Model {
	public id!: string
	public publisher_id!: string
	public name!: string
	public desc!: string
	public homepage!: string
	public trusted!: boolean
	public last_billed!: Date

	static initializeModel(sequelize: Sequelize): Model {
		return Application.init({
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				allowNull: false,
				primaryKey: true,
				unique: true
			},
			publisher_id: {
				type: DataTypes.UUID,
				allowNull: false
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false
			},
			desc: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [50, 512]
				}
			},
			homepage: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: { isURL: true }
			},
			trusted: {
				type: DataTypes.BOOLEAN,
				defaultValue: false
			},
			last_billed: {
				type: DataTypes.DATE,
				defaultValue: DataTypes.NOW,
				allowNull: false
			}
		}, {
			sequelize,
			modelName: 'application'
		})
	}
}

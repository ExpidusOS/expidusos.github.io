import { Sequelize, Model, DataTypes } from 'sequelize'

export default class Client extends Model {
	public id!: string;
	public secret!: string;
	public grants!: string[];

	static initializeModel(sequelize: Sequelize) {
		Client.init({
			id: {
				type: DataTypes.UUID,
				allowNull: false,
				primaryKey: true,
				unique: true
			},
			secret: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true
			},
			grants: {
				type: DataTypes.STRING,
				allowNull: true,
				set(value: string[]) {
					this.setDataValue('grants', value.join(','))
				},
				get() {
					return (this.getDataValue('grants') || '').split(',')
				}
			}
		}, {
			sequelize,
			modelName: 'client'
		})
	}
}

import { Sequelize, DataTypes, Model } from 'sequelize'
import crypto from 'crypto'

export default class ApplicationRelease extends Model {
	public app_id!: string
	public version!: string
	public arch!: string
	public changelog!: string
	public checksum!: string
	public binary!: string

	static initializeModel(sequelize: Sequelize): Model {
		return ApplicationRelease.init({
			id: {
				type: DataTypes.BIGINT,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
				unique: true
			},
			app_id: {
				type: DataTypes.UUID,
				allowNull: false
			},
			version: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					is: /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/
				}
			},
			arch: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					is: /^(aarch64|armv5te(|l)|armv[6-7](hf|l)|i686|ppc(64(|le)|)|x86_64)$/
				}
			},
			changelog: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [25, 1024]
				}
			},
			checksum: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					isChecksumGood(val) {
						const curr_checksum = crypto.createHash('sha512').update(Buffer.from(this.binary).toString('binary')).digest('hex')
						if (curr_checksum !== val) {
							throw new Error('Invalid checksum for the current binary')
						}
					}
				}
			},
			binary: {
				type: DataTypes.BLOB('long'),
				allowNull: false,
				set(val) {
					const buf = Buffer.from(val)
					this.setDataValue('binary', buf)
					this.setDataValue('checksum', crypto.createHash('sha512').update(buf.toString('binary')).digest('hex'))
				}
			}
		}, {
			sequelize,
			modelName: 'applicationRelease'
		})
	}
}

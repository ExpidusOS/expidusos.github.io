const env = process.env.NODE_ENV || 'development'

const logLevels: Record<string, string> = {
	test: 'error',
	development: 'debug',
	production: 'info'
}

const production = env === 'production'

export default {
	env,
	production,
	database: {
		connection: env === 'test'
			? 'sqlite::memory'
			: `mariadb://expidus:${process.env.DB_PASSWORD}@db/expidus`,
		options: {
			logging: env !== 'test'
		}
	},
	winston: {
		level: logLevels[env]
	}
}

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
		connection: `mariadb://expidus:${process.env.DB_PASSWORD}@db/expidus`
	},
	winston: {
		level: logLevels[env]
	}
}

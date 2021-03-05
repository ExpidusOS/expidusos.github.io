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
	clients: [
		{
			id: 'c083b285-2cbd-451a-9a14-cd580e55ec67',
			secret: '3D439605F0E42B00EEF0C784700C99CA',
			redirects: ['https://account.expidusos.com/login', 'https://account.expidusos.com/register'],
			grants: ['authorization_code', 'password'],
			perms: ['profile:all']
		}
	],
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

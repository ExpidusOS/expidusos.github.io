import { Router } from 'express'
import { validateBody } from '../middleware/validate'
import DIContainer from '../../providers/di'
import genController from '../controllers/user'
import OAuthServer from 'express-oauth-server'

const schema_register = {
	id: '/UserRegister',
	type: 'object',
	properties: {
		username: { type: 'string', pattern: '[^\\s]+', minLength: 5 },
		password: { type: 'string', minLength: 8 },
		email: { type: 'string', format: 'email' },
		birthdate: { type: 'string', format: 'date' },
	},
	required: ['username', 'password', 'email', 'birthdate']
}

export default function(di: DIContainer, oauth: OAuthServer): Router {
	const router = Router()
	const controller = genController(di)
	
	router.get('/auth', oauth.authorize({
		allowEmptyState: true
	}))
	router.post('/token', oauth.token())

	router.post(
		'/register',
		validateBody(schema_register),
		controller.register
	)

	router.get(
		'/info',
		oauth.authenticate({ allowBearerTokensInQueryString: true }),
		controller.info
	)

	return router
}

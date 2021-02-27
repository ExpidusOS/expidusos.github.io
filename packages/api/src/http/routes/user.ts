import { Router } from 'express'
import { validateBody } from '../middleware/validate'
import DIContainer from '../../providers/di'
import genController from '../controllers/user'

const schema = {
	id: '/UserRegister',
	type: 'object',
	properties: {
		username: { type: 'string', pattern: "[^\s]*", minLength: 5 },
		password: { type: 'string', minLength: 8 },
		email: { type: 'string', format: 'email' },
		birthdate: { type: 'string', format: 'date' },
	},
	required: ['username', 'password', 'email', 'birthdate']
}

export default function(di: DIContainer): Router {
	const router = Router()
	const controller = genController(di)

	router.post(
		'/register',
		validateBody(schema),
		controller.register
	)

	return router
}

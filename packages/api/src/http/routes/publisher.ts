import { Router } from 'express'
import { validateBody } from '../middleware/validate'
import DIContainer from '../../providers/di'
import genController from '../controllers/publisher'

const schema_find = {
	id: '/PublisherFind',
	type: 'object',
	properties: {
		owner: { type: 'string', required: false },
		trusted: { type: 'boolean', required: false },
		name: { type: 'string', required: false },
		id: { type: 'string', required: false },
		limit: { type: 'number', required: false },
		offset: { type: 'number', required: false }
	}
}

const schema_create = {
	id: '/PublisherCreate',
	type: 'object',
	properties: {
		name: { type: 'string', required: true },
		desc: { type: 'string', required: false },
		homepage: { type: 'string', required: true },
		email: { type: 'string', format: 'email', required: true }
	}
}

const schema_delete = {
	id: '/PublisherDelete',
	type: 'object',
	properties: {
		id: { type: 'string', required: true }
	}
}

export default function(di: DIContainer): Router {
	const router = Router()
	const controller = genController(di)

	router.get('/find',
		validateBody(schema_find),
		controller.list
	)

	router.post('/',
		di.oauth.authenticate({ allowBearerTokensInQueryString: true }),
		validateBody(schema_create),
		controller.create
	)

	router.delete('/',
		di.oauth.authenticate({ allowBearerTokensInQueryString: true }),
		validateBody(schema_delete),
		controller.delete
	)

	return router
}

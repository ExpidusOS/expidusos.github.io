import { Router } from 'express'

import genController from '../controllers/user'
import Server from '../../server'

export default function(server: Server): Router {
	const router = Router()
	const controller = genController(server)

	router.post('/register', controller.register)
	return router
}

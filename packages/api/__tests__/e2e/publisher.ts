/* eslint-env jest */
import supertest from 'supertest'
import app from '../../src/http/app'
import User from '../../src/database/models/user'
import { sequelize } from '../../src/database'

describe('E2E - Publisher', () => {
	const request = supertest(app)

	beforeAll(async () => {
		await sequelize.authenticate()
		await sequelize.sync({ force: true })
	})

	afterAll(async () => {
		await sequelize.close()
	})

	describe('POST /v1/publisher/', () => {
		test('invalid access token', () => request
			.post('/v1/publisher/')
			.expect(401))
	})

	describe('GET /v1/publisher/find', () => {
		test('invalid uuid owner', () => request
			.get('/v1/publisher/find?owner=uuid:an-invalid-uuid')
			.expect(422))

		test('invalid username owner', () => request
			.get('/v1/publisher/find?owner=username:@wont-work')
			.expect(422))
	})
})

/* eslint-env jest */
import supertest from 'supertest'
import app from '../../src/http/app'
import User from '../../src/database/models/user'
import { sequelize } from '../../src/database'
import { seeder } from '../../src/umzug'
import qs from 'qs'

describe('E2E - Publisher', () => {
	const request = supertest(app)

	beforeAll(async () => {
		await sequelize.authenticate()
		await sequelize.sync({ force: true })
		await seeder.up()
	})

	afterAll(async () => {
		await seeder.down()
		await sequelize.close()
	})

	describe('POST /v1/publisher/', () => {
		test('invalid access token', () => request
			.post('/v1/publisher/?access_token=none')
			.expect(500))

		test('create demo publisher', () => request
			.post('/v1/publisher/?access_token=dummy_token')
			.send(qs.stringify({
				name: 'Demo Publisher',
				email: 'demo@example.com',
				homepage: 'https://example.com'
			}))
			.expect((response: any) => {
				expect(response.status).toBe(200)
				expect(response.body).toMatchObject({
					data: {
						name: 'Demo Publisher',
						email: 'demo@example.com',
						homepage: 'https://example.com',
						trusted: false
					},
					type: 'publisher:create'
				})
			}))
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

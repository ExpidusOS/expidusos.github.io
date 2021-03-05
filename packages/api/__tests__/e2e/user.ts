/* eslint-env jest */
import supertest from 'supertest'
import app from '../../src/http/app'
import { sequelize } from '../../src/database'

describe('E2E - User', () => {
  const request = supertest(app)

  beforeAll(async () => {
    await sequelize.authenticate()
    await sequelize.sync({ force: true })
  })

  afterAll(async () => {
    await sequelize.close()
  })

  describe('POST /v1/user/register', () => {
    test('missing body data', () => request
      .post('/v1/user/register')
      .expect(422))

    test('invalid body data', () => request
      .post('/v1/user/register')
      .send({ username: 'a' })
      .expect(422))

    test('valid body data', () => request
      .post('/v1/user/register')
      .send({
        username: 'jesttest',
        password: 'superlongpassword',
        birthdate: '2000-01-01',
        email: 'user@domain.foo'
      })
      .expect((response: any) => {
        expect(response.status).toBe(200)
        expect(response.body).toMatchObject({
          type: 'user:register',
          data: {
            uuid: expect.any(String),
            username: 'jesttest',
            birthdate: '2000-01-01T00:00:00.000Z',
            email: 'user@domain.foo'
          }
        })
      }))

    test('existing user', () => request
      .post('/v1/user/register')
      .send({
        username: 'jesttest',
        password: 'superlongpassword',
        birthdate: '2000-01-01',
        email: 'user@domain.foo'
      })
      .expect(400))
  })
})

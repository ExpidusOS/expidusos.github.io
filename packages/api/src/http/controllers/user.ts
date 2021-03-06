import { Request, Response, NextFunction } from 'express'
import DIContainer from '../../providers/di'
import AccessToken from '../../database/models/accesstoken'
import Client from '../../database/models/client'
import User from '../../database/models/user'
import { BaseMessage } from '../../message'
import { HttpBadRequestError, HttpValidationError } from '../exceptions'
import OAuth2Server from 'oauth2-server'
import { validate } from 'jsonschema'
import bcrypt from 'bcrypt'

export default function(di: DIContainer) {
	return {
		async auth(req: Request, res: Response): Promise<OAuth2Server.User> {
			const v = validate({
				username: req.query.username,
				password: req.query.password
			}, {
				id: '/UserAuthentication',
				type: 'object',
				properties: {
					username: { type: 'string', pattern: '[^\\s]+', minLength: 5 },
					password: { type: 'string', minLength: 8 },
				},
				required: ['username', 'password']
			})

			if (!v.valid) throw new HttpValidationError(v.errors)

			const user = await User.findOne({
				where: { username: req.query.username }
			})

			if (!user) {
				throw new Error('Invalid user')
			}

			if (!bcrypt.compareSync(req.query.password, user.get('password'))) throw new Error('Invalid password')

			return user.toJSON()
		},
		async register(req: Request, res: Response, next: NextFunction) {
			try {
				const { username } = req.body
				const user = await User.findOne({
					where: { username }
				})

				if (user !== null) {
					throw new HttpBadRequestError(`User "${username}" already exists`)
				}

				const createdUser = await User.create({
					username,
					password: req.body.password,
					birthdate: req.body.birthdate,
					email: req.body.email
				})

				res.json(new BaseMessage({
					username: createdUser.username,
					uuid: createdUser.uuid,
					email: createdUser.email,
					birthdate: createdUser.birthdate
				}, 'user:register'))
			} catch (e) {
				next(e)
			}
		},
		async info(req: Request, res: Response, next: NextFunction) {
			try {
				const access_token = await AccessToken.findOne({
					where: { token: res.locals.oauth.token.accessToken }
				})
				if (access_token == null) {
					throw new HttpBadRequestError('Access token does not exist')
				}

				const user = await User.findOne({
					where: { uuid: access_token.uuid }
				})
				if (user == null) {
					throw new HttpBadRequestError('User does not exist')
				}

				const client = await Client.findOne({
					where: { id: access_token.client_id }
				})
				if (client == null) {
					throw new HttpBadRequestError('Client does not exist')
				}

				const info: Record<string, any> = {
					uuid: user.uuid,
					username: user.username
				}

				if (client.hasPermission(['profile:email'])) {
					info['email'] = user.email
				}

				if (client.hasPermission(['profile:birthdate'])) {
					info['birthdate'] = user.birthdate
				}

				res.json(new BaseMessage(info, 'user:info'))
			} catch (e) {
				next(e)
			}
		}
	}
}

import { Request, Response, NextFunction } from 'express'
import DIContainer from '../../providers/di'
import AccessToken from '../../database/models/accesstoken'
import Client from '../../database/models/client'
import User from '../../database/models/user'
import { BaseMessage } from '../../message'
import { HttpBadRequestError } from '../exceptions'

export default function(di: DIContainer) {
	return {
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
				const user = await User.findOne({
					where: { uuid: req.user.uuid }
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

				if (client.grants.indexOf('profile') > -1 || client.grants.indexOf('profile:email') > -1) {
					info['email'] = user.email
				}

				if (client.grants.indexOf('profile') > -1 || client.grants.indexOf('profile:birthdate') > -1) {
					info['birthdate'] = user.birthdate
				}

				res.json(new BaseMessage(info, 'user:info'))
			} catch (e) {
				next(e)
			}
		}
	}
}

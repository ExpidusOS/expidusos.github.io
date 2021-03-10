import { Request, Response, NextFunction } from 'express'
import AccessToken from '../../database/models/accesstoken'
import Client from '../../database/models/client'
import Publisher from '../../database/models/publisher'
import User from '../../database/models/user'
import DIContainer from '../../providers/di'
import { HttpBadRequestError } from '../exceptions'
import { BaseMessage } from '../../message'

export default function(di: DIContainer) {
	return {
		async list(req: Request, res: Response, next: NextFunction) {
			try {
				const where: Record<string, any> = {}

				if (typeof req.query.owner === 'string') {
					if (req.query.owner.startsWith('uuid:')) {
						where['owner_uuid'] = req.query.owner.split(':')[1]
					} else if (req.query.owner.startsWith('username:')) {
						const user = await User.findOne({
							where: { username: req.query.owner.split(':')[1] }
						})

						if (user === null) {
							throw new HttpBadRequestError('User does not exist')
						}

						where['owner_uuid'] = user.uuid
					}
				}

				if (typeof req.query.trusted === 'string') where['trusted'] = req.query.trusted === 'true' ? true : false
				if (typeof req.query.name === 'string') where['name'] = req.query.name
				if (typeof req.query.uuid === 'string') where['uuid'] = req.query.id

				const publishers = await Publisher.findAll({
					where,
					limit: typeof req.query.limit === 'string' ? parseInt(req.query.limit) : undefined,
					offset: typeof req.query.offset == 'string' ? parseInt(req.query.offset) : undefined
				})

				res.json(new BaseMessage(publishers.map((publisher) => ({
					id: publisher.uuid,
					name: publisher.name,
					desc: publisher.desc,
					email: publisher.email,
					homepage: publisher.homepage,
					trusted: publisher.trusted
				})), 'publisher:list'))
			} catch (e) {
				next(e)
			}
		},
		async create(req: Request, res: Response, next: NextFunction) {
			try {	
				const access_token = await AccessToken.findOne({
					where: { token: res.locals.oauth.token.accessToken }
				})
				if (access_token == null) {
					throw new HttpBadRequestError('Access token does not exist')
				}

				const client = await Client.findOne({
					where: { id: access_token.client_id }
				})
				if (client == null) {
					throw new HttpBadRequestError('Client does not exist')
				}

				if (!client.hasPermission(['publisher:create'])) {
					throw new HttpBadRequestError('Client does not have permission to create publishers')
				}

				const publisher = await Publisher.findOne({
					where: { name: req.body.name }
				})

				if (publisher !== null) {
					throw new HttpBadRequestError('Publisher already exists with that name')
				}

				const createdPublisher = await Publisher.create({
					owner_uuid: access_token.uuid,
					name: req.body.name,
					homepage: req.body.homepage,
					desc: req.body.desc,
					email: req.body.email
				})

				res.json(new BaseMessage({
					id: createdPublisher.uuid,
					name: createdPublisher.name,
					desc: createdPublisher.desc,
					email: createdPublisher.email,
					homepage: createdPublisher.homepage,
					trusted: createdPublisher.trusted
				}, 'publisher:create'))
			} catch (e) {
				next(e)
			}
		},
		async delete(req: Request, res: Response, next: NextFunction) {
			try {
				const access_token = await AccessToken.findOne({
					where: { token: res.locals.oauth.token.accessToken }
				})
				if (access_token == null) {
					throw new HttpBadRequestError('Access token does not exist')
				}

				const client = await Client.findOne({
					where: { id: access_token.client_id }
				})
				if (client == null) {
					throw new HttpBadRequestError('Client does not exist')
				}

				if (!client.hasPermission(['publisher:delete'])) {
					throw new HttpBadRequestError('Client does not have permission to destroy publishers')
				}

				const publisher = await Publisher.findOne({
					where: { uuid: req.body.id, owner_uuid: access_token.uuid }
				})
				if (publisher === null) {
					throw new HttpBadRequestError('Publisher does not exist')
				}

				await publisher.destroy()

				res.json(new BaseMessage({ success: true }, 'publisher:delete'))
			} catch (e) {
				next(e)
			}
		}
	}
}

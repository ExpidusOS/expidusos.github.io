import Server from '../../server'
import { Request, Response, NextFunction } from 'express'
import { validate } from 'jsonschema'

import User from '../../models/user'
import { BaseMessage, ValidatorErrorMessage } from '../../message'

const schema = {
	id: '/UserRegister',
	type: 'object',
	properties: {
		username: { type: 'string' },
		password: { type: 'string' },
		email: { type: 'string' },
		birthdate: { type: 'string' },
	},
	required: ['username', 'password', 'email', 'birthdate']
}

export default function(server: Server) {
	return {
		register(req: Request, res: Response, next: NextFunction) {
			const v = validate(req.body, schema)
			if (!v.valid) {
				res.status(422).json(new ValidatorErrorMessage(v).toJSON())
				return;
			}

			User.findOne({
				where: { username: v.instance.username }
			}).then((user) => {
				if (user !== null) {
					throw new Error(`User \"${v.instance.username}\" already exists`)
				}
				return User.create({
					username:	v.instance.username,
					password: v.instance.password,
					birthdate: v.instance.birthdate,
					email: v.instance.email
				})
			}).then((user) => {
				res.json(new BaseMessage({
					username: user.username,
					uuid: user.uuid,
					email: user.email,
					birthdate: user.birthdate
				}, 'register'))
			}).catch((error: Error) => {
				res.status(422).json(new BaseMessage(null, error).toJSON())
			})
		}
	}
}

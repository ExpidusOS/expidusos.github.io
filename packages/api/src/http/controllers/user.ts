import { Request, Response, NextFunction } from 'express'
import DIContainer from '../../providers/di'
import User from '../../database/models/user'
import { BaseMessage } from '../../message'

export default function(di: DIContainer) {
	return {
		async register(req: Request, res: Response, next: NextFunction) {
			try {
				const { username } = req.body
				const user = await User.findOne({
					where: { username }
				})

				if (user !== null) {
					throw new Error(`User \"${username}\" already exists`)
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
				}, 'register'))
			} catch (e) {
				next(e)
			}
		}
	}
}

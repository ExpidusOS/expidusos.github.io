import { Request, Response, NextFunction } from 'express'
import { HttpError, HttpNotFoundError } from '../exceptions'
import winston from '../../providers/winston'

export function notFoundHandler(req: Request, res: Response, next: NextFunction) {
	next(new HttpNotFoundError())
}

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
	const response = {
		status: 500,
		detail: 'Internal server error'
	}

	if (err instanceof HttpError) {
		Object.assign(response, err.toJSON())
	} else {
		winston.error(err.stack)
	}

	res.status(response.status).json(response)
}

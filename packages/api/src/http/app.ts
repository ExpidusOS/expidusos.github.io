import express from 'express'
import OAuthServer from 'express-oauth-server'
import OAuthModel from '../oauth'
import genUserRouter from './routes/user'
import winston from '../providers/winston'
import DIContainer from '../providers/di'
import { sequelize } from '../database'
import { notFoundHandler, errorHandler } from './middleware/error'
import cors from 'cors'

const app = express()
const di = new DIContainer(
	app,
	winston,
	sequelize
)

const oauth = new OAuthServer({
	model: new OAuthModel(di)
})

app.use((req, res, next) => {
	winston.debug(`receving request from ${req.protocol}://${req.hostname}${req.originalUrl} (${req.method})`)
	next()
})

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
app.use('/v1/user', genUserRouter(di, oauth))
app.use(notFoundHandler)
app.use(errorHandler)

export default app

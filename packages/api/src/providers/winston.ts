import winston from 'winston'
import config from '../config'

const logger = winston.createLogger({
	level: config.winston.level,
	format: winston.format.combine(
		winston.format.colorize(),
		winston.format.splat(),
		winston.format.simple()
	),
	transports: [ new winston.transports.Console() ]
})


export default logger

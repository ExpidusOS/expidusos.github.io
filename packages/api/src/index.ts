import Server from './server'

const server = new Server()

server.start().then(() => {}).catch(err => {
	process.exit(1)
})

export default server

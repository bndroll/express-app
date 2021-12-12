import express, { Express } from 'express'
import { Server } from 'http'
import { userRouter } from './users/users'


export class App {
	app: Express
	server: Server
	port: number

	constructor() {
		this.app = express()
		this.port = 3000
	}

	useRoutes() {
		this.app.use('/users', userRouter)
	}

	public async init() {
		this.useRoutes()
		this.server = this.app.listen(this.port)
		console.log(`server listen on http://localhost:${this.port}`)
	}
}
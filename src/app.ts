import express, { Express } from 'express'
import { Server } from 'http'
import { UsersController } from './users/users.controller'
import { LoggerService } from './logger/logger.service'


export class App {
	app: Express
	server: Server
	port: number
	logger: LoggerService
	usersController: UsersController

	constructor(
		logger: LoggerService,
		usersController: UsersController
	) {
		this.app = express()
		this.port = 3000
		this.logger = logger
		this.usersController = usersController
	}

	useRoutes() {
		this.app.use('/users', this.usersController.router)
	}

	public async init() {
		this.useRoutes()
		this.server = this.app.listen(this.port)
		this.logger.log(`server listen on http://localhost:${this.port}`)
	}
}
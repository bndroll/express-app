import express, { Express } from 'express'
import { Server } from 'http'
import { UsersController } from './users/users.controller'
import { LoggerService } from './logger/logger.service'
import { ExceptionFilter } from './errorrs/exception.filter'


export class App {
	app: Express
	server: Server
	port: number
	logger: LoggerService
	usersController: UsersController
	exceptionFilter: ExceptionFilter

	constructor(
		logger: LoggerService,
		usersController: UsersController,
		exceptionFilter: ExceptionFilter
	) {
		this.app = express()
		this.port = 3000
		this.logger = logger
		this.usersController = usersController
		this.exceptionFilter = exceptionFilter
	}

	useRoutes() {
		this.app.use('/users', this.usersController.router)
	}

	useExceptionFilters() {
		this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter))
	}

	public async init() {
		this.useRoutes()
		this.useExceptionFilters()
		this.server = this.app.listen(this.port)
		this.logger.log(`server listen on http://localhost:${this.port}`)
	}
}
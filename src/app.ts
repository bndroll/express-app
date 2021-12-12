import express, { Express } from 'express'
import { Server } from 'http'
import { inject, injectable } from 'inversify'
import { UsersController } from './users/users.controller'
import { ExceptionFilter } from './errorrs/exception.filter'
import { ILogger } from './logger/logger.interface'
import { TYPES } from './types'
import 'reflect-metadata'


@injectable()
export class App {
	app: Express
	server: Server
	port: number

	constructor(
		@inject(TYPES.ILogger) private logger: ILogger,
		@inject(TYPES.UsersController) private usersController: UsersController,
		@inject(TYPES.ExceptionFilter) private exceptionFilter: ExceptionFilter
	) {
		this.app = express()
		this.port = 3000
	}

	useRoutes(): void {
		this.app.use('/users', this.usersController.router)
	}

	useExceptionFilters(): void {
		this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter))
	}

	public async init(): Promise<void> {
		this.useRoutes()
		this.useExceptionFilters()
		this.server = this.app.listen(this.port)
		this.logger.log(`server listen on http://localhost:${ this.port }`)
	}
}
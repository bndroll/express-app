import express, { Express } from 'express'
import { Server } from 'http'
import { inject, injectable } from 'inversify'
import { json } from 'body-parser'
import { UsersController } from './users/users.controller'
import { IExceptionFilter } from './errorrs/exception.filter.interface'
import { ILogger } from './logger/logger.interface'
import { TYPES } from './types'
import { IConfigService } from './config/config.service.interface'
import { PrismaService } from './database/prisma.service'
import { AuthMiddleware } from './common/auth.middleware'
import 'reflect-metadata'


@injectable()
export class App {
	app: Express
	server: Server
	port: number

	constructor(
		@inject(TYPES.Logger) private logger: ILogger,
		@inject(TYPES.UsersController) private usersController: UsersController,
		@inject(TYPES.ExceptionFilter) private exceptionFilter: IExceptionFilter,
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.PrismaService) private prismaService: PrismaService
	) {
		this.app = express()
		this.port = 3000
	}

	useRoutes(): void {
		this.app.use('/users', this.usersController.router)
	}

	useMiddleware(): void {
		this.app.use(json())
		const authMiddleware = new AuthMiddleware(this.configService.get('SECRET'))
		this.app.use(authMiddleware.execute.bind(authMiddleware))
	}

	useExceptionFilters(): void {
		this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter))
	}

	public async init(): Promise<void> {
		this.useMiddleware()
		this.useRoutes()
		this.useExceptionFilters()
		await this.prismaService.connect()
		this.server = this.app.listen(this.port)
		this.logger.log(`server listen on http://localhost:${ this.port }`)
	}

	public close(): void {
		this.server.close()
	}
}
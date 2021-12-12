import { NextFunction, Request, Response } from 'express'
import { inject } from 'inversify'
import { BaseController } from '../common/base.controller'
import { HTTPError } from '../errorrs/http-error.class'
import { ILogger } from '../logger/logger.interface'
import { TYPES } from '../types'
import 'reflect-metadata'


export class UsersController extends BaseController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger
	) {
		super(loggerService)
		this.bindRoutes([
			{path: '/register', method: 'post', func: this.register},
			{path: '/login', method: 'post', func: this.login}
		])
	}

	login(req: Request, res: Response, next: NextFunction) {
		next(new HTTPError(401, `authorization error`, 'login'))
	}

	register(req: Request, res: Response, next: NextFunction) {
		this.ok(res, 'register')
	}
}
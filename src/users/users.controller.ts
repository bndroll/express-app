import { NextFunction, Request, Response } from 'express'
import { inject, injectable } from 'inversify'
import { IUserController } from './users.controller.interface'
import { BaseController } from '../common/base.controller'
import { HTTPError } from '../errorrs/http-error.class'
import { ILogger } from '../logger/logger.interface'
import { TYPES } from '../types'
import 'reflect-metadata'


@injectable()
export class UsersController extends BaseController implements IUserController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger
	) {
		super(loggerService)
		this.bindRoutes([
			{ path: '/register', method: 'post', func: this.register },
			{ path: '/login', method: 'post', func: this.login }
		])
	}

	login(req: Request, res: Response, next: NextFunction): void {
		next(new HTTPError(401, `authorization error`, 'login'))
	}

	register(req: Request, res: Response, next: NextFunction): void {
		this.ok(res, 'register')
	}
}
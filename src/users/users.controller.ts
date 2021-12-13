import { NextFunction, Request, Response } from 'express'
import { inject, injectable } from 'inversify'
import { IUsersController } from './users.controller.interface'
import { BaseController } from '../common/base.controller'
import { HTTPError } from '../errorrs/http-error.class'
import { ILogger } from '../logger/logger.interface'
import { TYPES } from '../types'
import { UserLoginDto } from './dto/user-login.dto'
import { UserRegisterDto } from './dto/user-register.dto'
import { UsersService } from './users.service'
import { ValidateMiddleware } from '../common/validate.middleware'
import 'reflect-metadata'


@injectable()
export class UsersController extends BaseController implements IUsersController {
	constructor(
		@inject(TYPES.Logger) private loggerService: ILogger,
		@inject(TYPES.UsersService) private usersService: UsersService
	) {
		super(loggerService)
		this.bindRoutes([
			{
				path: '/register',
				method: 'post',
				func: this.register,
				middlewares: [new ValidateMiddleware(UserRegisterDto)]
			},
			{ path: '/login', method: 'post', func: this.login }
		])
	}

	login(req: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction): void {
		console.log(req.body)
		next(new HTTPError(401, `authorization error`, 'login'))
	}

	async register(req: Request<{}, {}, UserRegisterDto>, res: Response, next: NextFunction): Promise<void> {
		const result = await this.usersService.createUser(req.body)
		if (!result) return next(new HTTPError(422, `this user is exist`))
		this.ok(res, { email: result.email })
	}
}
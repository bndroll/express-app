import { NextFunction, Request, Response } from 'express'
import { inject, injectable } from 'inversify'
import { IUsersController } from './users.controller.interface'
import { BaseController } from '../common/base.controller'
import { HTTPError } from '../errorrs/http-error.class'
import { ILogger } from '../logger/logger.interface'
import { TYPES } from '../types'
import { UserLoginDto } from './dto/user-login.dto'
import { UserRegisterDto } from './dto/user-register.dto'
import { ValidateMiddleware } from '../common/validate.middleware'
import { IUsersService } from './users.service.interface'
import { IConfigService } from '../config/config.service.interface'
import { sign } from 'jsonwebtoken'
import 'reflect-metadata'


@injectable()
export class UsersController extends BaseController implements IUsersController {
	constructor(
		@inject(TYPES.Logger) private loggerService: ILogger,
		@inject(TYPES.UsersService) private usersService: IUsersService,
		@inject(TYPES.ConfigService) private configService: IConfigService
	) {
		super(loggerService)
		this.bindRoutes([
			{
				path: '/register',
				method: 'post',
				func: this.register,
				middlewares: [new ValidateMiddleware(UserRegisterDto)]
			},
			{
				path: '/login',
				method: 'post',
				func: this.login,
				middlewares: [new ValidateMiddleware(UserLoginDto)]
			},
			{
				path: '/info',
				method: 'get',
				func: this.info,
				middlewares: []
			}
		])
	}

	async login(req: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction): Promise<void> {
		const result = await this.usersService.validateUser(req.body)
		if (!result) return next(new HTTPError(401, `authorization error`, 'login'))

		const jwt = await this.signJWT(req.body.email, this.configService.get('SECRET'))

		this.ok(res, { jwt })
	}

	async register(req: Request<{}, {}, UserRegisterDto>, res: Response, next: NextFunction): Promise<void> {
		const result = await this.usersService.createUser(req.body)
		if (!result) return next(new HTTPError(422, `this user already exist`))

		this.ok(res, { email: result.email, id: result.id })
	}

	async info(req: Request, res: Response, next: NextFunction): Promise<void> {
		this.ok(res, { email: req.user })
	}

	private signJWT(email: string, secret: string): Promise<string> {
		return new Promise<string>((resolve, reject) => {
			sign(
				{ email, iat: Math.floor(Date.now() / 1000) },
				secret,
				{ algorithm: 'HS256' },
				(error, token) => {
					if (error) reject(error)
					resolve(token as string)
				}
			)
		})
	}
}
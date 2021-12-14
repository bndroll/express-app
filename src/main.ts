import { Container, ContainerModule, interfaces } from 'inversify'
import { App } from './app'
import { LoggerService } from './logger/logger.service'
import { UsersController } from './users/users.controller'
import { ExceptionFilter } from './errorrs/exception.filter'
import { IExceptionFilter } from './errorrs/exception.filter.interface'
import { ILogger } from './logger/logger.interface'
import { TYPES } from './types'
import { IUsersService } from './users/users.service.interface'
import { UsersService } from './users/users.service'
import { IUsersController } from './users/users.controller.interface'
import { IConfigService } from './config/config.service.interface'
import { ConfigService } from './config/config.service'
import { PrismaService } from './database/prisma.service'
import { IUsersRepository } from './users/users.repository.interface'
import { UsersRepository } from './users/users.repository'


export interface IBootstrapReturn {
	appContainer: Container
	app: App
}

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.Logger).to(LoggerService).inSingletonScope()
	bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter)
	bind<IUsersController>(TYPES.UsersController).to(UsersController)
	bind<IUsersService>(TYPES.UsersService).to(UsersService)
	bind<IUsersRepository>(TYPES.UsersRepository).to(UsersRepository).inSingletonScope()
	bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope()
	bind<PrismaService>(TYPES.PrismaService).to(PrismaService).inSingletonScope()
	bind<App>(TYPES.Application).to(App)
})

async function bootstrap(): Promise<IBootstrapReturn> {
	const appContainer = new Container()
	appContainer.load(appBindings)

	const app = appContainer.get<App>(TYPES.Application)
	await app.init()

	return { appContainer, app }
}

export const boot = bootstrap()
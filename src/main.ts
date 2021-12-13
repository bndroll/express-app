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


export interface IBootstrapReturn {
	appContainer: Container
	app: App
}

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.Logger).to(LoggerService).inSingletonScope()
	bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter)
	bind<IUsersController>(TYPES.UsersController).to(UsersController)
	bind<IUsersService>(TYPES.UsersService).to(UsersService)
	bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope()
	bind<App>(TYPES.Application).to(App)
})

function bootstrap(): IBootstrapReturn {
	const appContainer = new Container()
	appContainer.load(appBindings)

	const app = appContainer.get<App>(TYPES.Application)
	app.init()

	return { appContainer, app }
}

export const { app, appContainer } = bootstrap()
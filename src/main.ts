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


export interface IBootstrapReturn {
	appContainer: Container
	app: App
}

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.ILogger).to(LoggerService)
	bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter)
	bind<IUsersController>(TYPES.UsersController).to(UsersController)
	bind<IUsersService>(TYPES.UsersService).to(UsersService)
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
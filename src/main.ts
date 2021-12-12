import { Container, ContainerModule, interfaces } from 'inversify'
import { App } from './app'
import { LoggerService } from './logger/logger.service'
import { UsersController } from './users/users.controller'
import { ExceptionFilter } from './errorrs/exception.filter'
import { IExceptionFilter } from './errorrs/exception.filter.interface'
import { ILogger } from './logger/logger.interface'
import { TYPES } from './types'


export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.ILogger).to(LoggerService)
	bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter)
	bind<UsersController>(TYPES.UsersController).to(UsersController)
	bind<App>(TYPES.Application).to(App)
})

function bootstrap() {
	const appContainer = new Container()
	appContainer.load(appBindings)

	const app = appContainer.get<App>(TYPES.Application)
	app.init()

	return {appContainer, app}
}

export const {app, appContainer} = bootstrap()
import { Container } from 'inversify'
import { App } from './app'
import { LoggerService } from './logger/logger.service'
import { UsersController } from './users/users.controller'
import { ExceptionFilter } from './errorrs/exception.filter'
import { IExceptionFilter } from './errorrs/exception.filter.interface'
import { ILogger } from './logger/logger.interface'
import { TYPES } from './types'


export const appContainer = new Container()

appContainer.bind<ILogger>(TYPES.ILogger).to(LoggerService)
appContainer.bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter)
appContainer.bind<UsersController>(TYPES.UsersController).to(UsersController)
appContainer.bind<App>(TYPES.Application).to(App)

export const app = appContainer.get<App>(TYPES.Application)

app.init()
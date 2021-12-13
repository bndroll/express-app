import { inject, injectable } from 'inversify'
import { IUsersService } from './users.service.interface'
import { UserRegisterDto } from './dto/user-register.dto'
import { UserLoginDto } from './dto/user-login.dto'
import { User } from './user.entity'
import { TYPES } from '../types'
import { ConfigService } from '../config/config.service'
import { IUsersRepository } from './users.repository.interface'
import { UserModel } from '@prisma/client'


@injectable()
export class UsersService implements IUsersService {
	constructor(
		@inject(TYPES.ConfigService) private configService: ConfigService,
		@inject(TYPES.UsersRepository) private usersRepository: IUsersRepository
	) {
	}

	async createUser({ email, name, password }: UserRegisterDto): Promise<UserModel | null> {
		const newUser = new User(email, name)
		const salt = this.configService.get('SALT')

		await newUser.setPassword(password, Number(salt))

		const existedUser = await this.usersRepository.find(email)
		if (existedUser) return null

		return this.usersRepository.create(newUser)
	}

	async validateUser(dto: UserLoginDto): Promise<boolean> {
		return true
	}
}
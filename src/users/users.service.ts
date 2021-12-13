import { inject, injectable } from 'inversify'
import { IUsersService } from './users.service.interface'
import { UserRegisterDto } from './dto/user-register.dto'
import { UserLoginDto } from './dto/user-login.dto'
import { User } from './user.entity'
import { TYPES } from '../types'
import { ConfigService } from '../config/config.service'


@injectable()
export class UsersService implements IUsersService {
	constructor(@inject(TYPES.ConfigService) private configService: ConfigService) {
	}

	async createUser({ email, name, password }: UserRegisterDto): Promise<User | null> {
		const newUser = new User(email, name)
		const salt = this.configService.get('SALT')
		await newUser.setPassword(password, Number(salt))

		/*
		* check user
		* if not exist - return null
		* else - create user
		* */

		return null
	}

	async validateUser(dto: UserLoginDto): Promise<boolean> {
		return true
	}
}
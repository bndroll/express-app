import { injectable } from 'inversify'
import { IUsersService } from './users.service.interface'
import { UserRegisterDto } from './dto/user-register.dto'
import { UserLoginDto } from './dto/user-login.dto'
import { User } from './user.entity'


@injectable()
export class UsersService implements IUsersService {
	async createUser({ email, name, password }: UserRegisterDto): Promise<User | null> {
		const newUser = new User(email, name)
		await newUser.setPassword(password)

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
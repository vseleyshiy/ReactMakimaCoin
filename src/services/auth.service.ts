import { axiosClassic } from '../api/interceptors'
import { IAuth } from '../types/auth.types'
import { TypeUserStatus } from '../types/user.types'

class AuthService {
	private BASE_URL = '/auth'

	async login(data: IAuth) {
		const response = await axiosClassic.post<TypeUserStatus>(
			`${this.BASE_URL}/login.php`,
			data
		)

		return response
	}

	async reg(data: IAuth) {
		const response = await axiosClassic.post<TypeUserStatus>(
			`${this.BASE_URL}/reg.php`,
			data
		)

		return response
	}

	async logout() {
		sessionStorage.removeItem('id')
	}
}

export const authService = new AuthService()

import { axiosClassic } from '../api/interceptors'
import { TypeStatus } from '../components/Forms/types'
import { IUserUpdate } from '../types/user.types'

class UserService {
	private BASE_URL = '/user'

	async getProfile() {
		const response = await axiosClassic.get(`${this.BASE_URL}/profile.php`)
		return response.data
	}

	// async update(data: IUserUpdate) {
	// 	const response = await axiosClassic.put(`${this.BASE_URL}/update.php`, data)
	// 	return response.data
	// }

	async update(data: IUserUpdate) {
		const response = await axiosClassic.put<TypeStatus>(
			`${this.BASE_URL}/update.php`,
			data
		)

		return response
	}
}

export const userService = new UserService()

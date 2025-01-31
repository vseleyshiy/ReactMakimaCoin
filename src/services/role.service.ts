import { axiosClassic } from '../api/interceptors'

class RoleService {
	async getRoles() {
		const response = await axiosClassic.get(`/roles.php`)
		return response.data
	}
}

export const roleService = new RoleService()

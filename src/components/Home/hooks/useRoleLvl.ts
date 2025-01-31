import { useQuery } from '@tanstack/react-query'
import { roleService } from '../../../services/role.service'

export function useRoleLvl() {
	const { data, isLoading, isSuccess } = useQuery({
		queryKey: ['role_lvl'],
		queryFn: () => roleService.getRoles(),
	})

	const user_role = data?.[Number(sessionStorage.getItem('roleLvl')!)]
	const all_roles = data

	// уйди нахуй с бэка, напиши фронт хотя бы как то, чтобы завтра показать

	return { user_role, all_roles, isLoading }
}

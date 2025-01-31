import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { userService } from '../services/user.service'
import { IUserUpdate } from '../types/user.types'

export function useUpdate(data: IUserUpdate) {
	const queryClient = useQueryClient()
	const { mutate, isPending } = useMutation({
		mutationKey: [`update ${data.status}`],
		mutationFn: () => userService.update(data),
		onSuccess() {
			toast.success(
				`${
					data.status.charAt(0).toUpperCase() + data.status.slice(1)
				} успешно обновлён!`
			)
			queryClient.invalidateQueries({ queryKey: [data.status] })
		},
	})

	return {
		mutate,
		isPending,
	}
}

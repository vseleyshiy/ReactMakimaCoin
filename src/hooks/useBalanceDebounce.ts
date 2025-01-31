import debounce from 'lodash.debounce'
import { useCallback } from 'react'
import { IUserUpdate } from '../types/user.types'
import { useUpdate } from './useUpdate'

export function useBalanceDebounce(balance: string) {
	const { mutate } = useUpdate(balance)

	useCallback(
		debounce((data: IUserUpdate) => {
			mutate(data)
		}, 1000),
		[]
	)
}

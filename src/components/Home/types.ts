import { Dispatch, SetStateAction } from 'react'

export interface IEnergy {
	maxEnergy: number
	energy: number
	setEnergy: Dispatch<SetStateAction<number>>
}

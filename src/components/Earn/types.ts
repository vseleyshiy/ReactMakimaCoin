import { Dispatch, SetStateAction } from 'react'

export type TypeTasks = {
	id: number
	name: string
	description: string
	reward: number
	img: string
	link: string
	execute: boolean
}

export interface IItemProps {
	seconds: number
	setSeconds: Dispatch<SetStateAction<number>>
	timerActive: boolean
	setTimerActive: Dispatch<SetStateAction<boolean>>
	info: TypeTasks
	setInfo: Dispatch<SetStateAction<TypeTasks>>
	setModal: Dispatch<SetStateAction<boolean>>
}

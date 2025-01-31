import { LucideIcon } from 'lucide-react'

export interface IUpdateLvl {
	lastLvl: number
	price: number
	value: number
	setFunc: () => void
	// func?: Dispatch<SetStateAction<number>> | null
}

export interface IModalMenu {
	id: number
	icon: LucideIcon
	title: string
	text: string
	desc: string
	lvl: number
	lastLvl: number
	data: IUpdateLvl
}

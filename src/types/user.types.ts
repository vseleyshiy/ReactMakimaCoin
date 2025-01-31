export type TypeUserStatus = {
	message?: string
	status: string
	data: {
		id: number
		username: string
		// password: string
		role_lvl: number
		balance: number
		multitap_lvl: number
		max_energy_lvl: number
		hour_profit: number
		cards: string
		tasks: string
	}
}

export interface IUserUpdate {
	id: number
	status: string
	user_data: string | number
}

export interface IUserProfile {
	id: string | null
}

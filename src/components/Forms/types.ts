export interface IReg {
	email: string
	password1: string
	password2: string
}

export interface IInfo {
	id: string
	placeholder: string
	registerType: string
	registerRequired: string
	error: string | undefined
	isPassword?: boolean | undefined
}

export type TypeStatus = {
	status: string
	message: string
}

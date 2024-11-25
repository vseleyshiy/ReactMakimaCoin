import { TypeCards } from "../../database"

export interface IAuth {
    name: string
    password: string
}

export interface IReg {
    name: string
    password1: string
    password2: string
}

export type TypeStatus = {
    status: string
    message?: string
    data: {
        id: number
        username: string
        password: string
        roleLvl: number
        balance: number
        multitapLvl: number
        maxEnergyLvl: number
        hourProfit: number
        cards: string
        tasks: string
    }
}
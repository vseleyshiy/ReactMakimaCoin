import { Dispatch, SetStateAction } from "react"

export interface IHaveMoney {
    lastLvl: number
    price: number
    value: number
    setFunc: Dispatch<SetStateAction<number>> | null
    func?: Dispatch<SetStateAction<number>> | null
}
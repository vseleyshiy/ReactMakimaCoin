import { Dispatch, RefObject, SetStateAction } from "react"

export interface PropsCard {
    data: {
        id: number
        name: string
        description: string
        lvl: number
        profit: number
        allProfit: number
        price: number
        img: string
    }
}

export interface PropsCards {
    mineRef: RefObject<HTMLUListElement>
}

export interface ICards {
    id: number
    name: string
    description: string
    lvl: number
    profit: number
    allProfit: number
    price: number
    img: string
}

export interface IHaveMoney {
    price: number
    value: number
    index: number
}

export interface IInfo {
    id: number
    content: ICards
}
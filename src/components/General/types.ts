import { Dispatch, SetStateAction } from "react"

export interface Props {
    menu?: {
        auth: boolean
        reg: boolean
        home: boolean
        mine: boolean
        boost: boolean
        earn: boolean
        buttons: boolean
    }
    setMenu?: Dispatch<SetStateAction<{
        auth: boolean
        reg: boolean
        home: boolean
        mine: boolean
        boost: boolean
        earn: boolean
        buttons: boolean
    }>>
    style?: {
        display: string
    }
    setMaxEnergy?: Dispatch<SetStateAction<number>>
}

export interface IEnergy {
    maxEnergy: number
    energy: number
    setEnergy: Dispatch<SetStateAction<number>>
}
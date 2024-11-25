import { Dispatch, SetStateAction } from "react"

export interface Props {
    energy: number
    setEnergy: Dispatch<SetStateAction<number>>
}
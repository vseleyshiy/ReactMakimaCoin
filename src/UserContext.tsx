import { Dispatch, PropsWithChildren, SetStateAction, createContext, useState } from "react";

export interface IContext {
    username: string
    setUsername: Dispatch<SetStateAction<string>> | null
    lvl: number
    setLvl: Dispatch<SetStateAction<number>> | null
    balance: number
    setBalance: Dispatch<SetStateAction<number>> | null
    energy: number
    setEnergy: Dispatch<SetStateAction<number>> | null
    maxEnergy: number
    setMaxEnergy: Dispatch<SetStateAction<number>> | null
    lvlClick: number
    setLvlClick: Dispatch<SetStateAction<number>> | null
    lvlMaxEnergy: number
    setLvlMaxEnergy: Dispatch<SetStateAction<number>> | null
    hourProfit: number
    setHourProfit: Dispatch<SetStateAction<number>> | null

}

export const UserContext = createContext<IContext>({
    username: 'vseleyshiy',
    setUsername: null,
    lvl: 0,
    setLvl: null,
    balance: 0,
    setBalance: null,
    energy: 2000,
    setEnergy: null,
    maxEnergy: 2000,
    setMaxEnergy: null,
    lvlClick: 1,
    setLvlClick: null,
    lvlMaxEnergy: 1,
    setLvlMaxEnergy: null,
    hourProfit: 0,
    setHourProfit: null,
})

export const UserProvider = ({ children }: PropsWithChildren) => {

    const [username, setUsername] = useState('vseleyshiy');
    const [lvl, setLvl] = useState(0);
    const [balance, setBalance] = useState(0);
    const [energy, setEnergy] = useState(2000);
    const [maxEnergy, setMaxEnergy] = useState(2000);
    const [lvlClick, setLvlClick] = useState(1);
    const [lvlMaxEnergy, setLvlMaxEnergy] = useState(1);
    const [hourProfit, setHourProfit] = useState(0);

    return <UserContext.Provider value={{
        username,
        setUsername,
        lvl,
        setLvl,
        balance,
        setBalance,
        energy,
        setEnergy,
        maxEnergy,
        setMaxEnergy,
        lvlClick,
        setLvlClick,
        lvlMaxEnergy,
        setLvlMaxEnergy,
        hourProfit,
        setHourProfit
    }}>
        {children}
    </UserContext.Provider>
}
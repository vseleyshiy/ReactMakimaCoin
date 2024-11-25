import { Dispatch, PropsWithChildren, SetStateAction, createContext, useState } from "react";

export interface IContext {
    id: number
    setId: Dispatch<SetStateAction<number>> | null
    username: string
    setUsername: Dispatch<SetStateAction<string>> | null
    lvl: number
    setLvl: Dispatch<SetStateAction<number>> | null
    balance: number
    setBalance: Dispatch<SetStateAction<number>> | null
    lvlClick: number
    setLvlClick: Dispatch<SetStateAction<number>> | null
    lvlMaxEnergy: number
    setLvlMaxEnergy: Dispatch<SetStateAction<number>> | null
    hourProfit: number
    setHourProfit: Dispatch<SetStateAction<number>> | null
}

export const UserContext = createContext<IContext>({
    id: 0,
    setId: null,
    username: 'vseleyshiy',
    setUsername: null,
    lvl: 0,
    setLvl: null,
    balance: 0,
    setBalance: null,
    lvlClick: 1,
    setLvlClick: null,
    lvlMaxEnergy: 1,
    setLvlMaxEnergy: null,
    hourProfit: 0,
    setHourProfit: null,
})

export const UserProvider = ({ children }: PropsWithChildren) => {

    const [id, setId] = useState(0);
    const [username, setUsername] = useState('vseleyshiy');
    const [lvl, setLvl] = useState(0);
    const [balance, setBalance] = useState(0);
    const [lvlMaxEnergy, setLvlMaxEnergy] = useState(1);
    const [lvlClick, setLvlClick] = useState(1);
    const [hourProfit, setHourProfit] = useState(0);

    return <UserContext.Provider value={{
        id,
        setId,
        username,
        setUsername,
        lvl,
        setLvl,
        balance,
        setBalance,
        lvlClick,
        setLvlClick,
        lvlMaxEnergy,
        setLvlMaxEnergy,
        hourProfit,
        setHourProfit,
    }}>
        {children}
    </UserContext.Provider>
}
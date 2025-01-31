import {
	createContext,
	Dispatch,
	PropsWithChildren,
	SetStateAction,
	useState,
} from 'react'

interface IContext {
	balance: number
	setBalance: Dispatch<SetStateAction<number>> | null
	energy: number
	setEnergy: Dispatch<SetStateAction<number>> | null
}

// вот тут надо к бд сделать запрос, достать данные о энергии, которая доступна на моем уровне и подгрузить их так. Пока что напишу просто 2000

export const UserContext = createContext<IContext>({
	balance: Number(sessionStorage.getItem('balance')) ?? 0,
	setBalance: null,
	energy: 2000,
	setEnergy: null,
})

export const UserProvider = ({ children }: PropsWithChildren) => {
	const [balance, setBalance] = useState(0)
	const [energy, setEnergy] = useState(2000)

	return (
		<UserContext.Provider
			value={{
				balance,
				setBalance,
				energy,
				setEnergy,
			}}
		>
			{children}
		</UserContext.Provider>
	)
}

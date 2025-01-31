import { Dispatch, SetStateAction } from 'react'
import listStyles from '../Boost/List/List.module.css'
import { TypeTasks } from './types'

interface Props {
	info: TypeTasks
	setModal: Dispatch<SetStateAction<boolean>>
	timerActive: boolean
	setTimerActive: Dispatch<SetStateAction<boolean>>
}

export function EarnButton(props: Props) {
	const { info, setModal, timerActive, setTimerActive } = props

	return (
		<a
			href={info.link}
			style={{
				pointerEvents: info.execute || timerActive ? 'none' : 'all',
			}}
			target='_blank'
			onClick={() => {
				setModal(false)
				setTimerActive(true)
			}}
			className={
				info.execute
					? `${listStyles.submit} ${listStyles.ex}`
					: `${listStyles.submit}`
			}
		>
			{info.execute ? 'Выполнено' : 'Перейти'}
		</a>
	)
}

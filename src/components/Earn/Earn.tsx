import { CircleDollarSign } from 'lucide-react'
import { ReactNode, useEffect, useState } from 'react'
import { tasks } from '../../database'
import { Modal } from '../../utils/Modal/Modal'
import listStyles from '../Boost/List/List.module.css'
import styles from './Earn.module.css'
import { EarnButton } from './EarnButton'
import { EarnItem } from './EarnItem'
import { IItemProps, TypeTasks } from './types'

export function Earn() {
	const [modal, setModal] = useState(false)

	const [info, setInfo] = useState<TypeTasks>(tasks[0])

	const [seconds, setSeconds] = useState(10)

	const [timerActive, setTimerActive] = useState(false)

	const itemProps: IItemProps = {
		seconds,
		setSeconds,
		timerActive,
		setTimerActive,
		info,
		setInfo,
		setModal,
	}

	// useEffect(() => {
	// 	if (!timerActive) {
	// 		setBalance?.(prev => prev + info.content.reward!)
	// 		info.content.execute = true
	// 		const dataTask = user_tasks.find(item => item.id == info.content.id)
	// 		if (!dataTask) {
	// 			user_tasks.push({
	// 				id: info.content.id!,
	// 				name: info.content.name!,
	// 				description: info.content.description!,
	// 				reward: info.content.reward!,
	// 				img: info.content.img!,
	// 				link: info.content.link!,
	// 				execute: info.content.execute!,
	// 			})
	// 		}
	// 		addTask()
	// 	}
	// }, [timerActive])

	useEffect(() => {
		const dataTask = tasks.find(item => item.id === info.id)
		if (!dataTask) return
		setInfo({
			...dataTask,
		})
	}, [modal])

	// add user's task backend
	// const addTask = async () => {
	// 	const data = {
	// 		status: 'tasks',
	// 		id: id,
	// 		tasks: user_tasks,
	// 	}
	// 	await axios.post(
	// 		'https://reactmakimacoin.local/src/api/update.php',
	// 		`data=${JSON.stringify(data)}`
	// 	)
	// }

	return (
		<>
			<div className={styles.earn}>
				<div className={styles.top__img}>
					<CircleDollarSign size={120} />
				</div>
				<div className={styles.top__title}>
					{timerActive && !info.execute
						? `КД 00:${seconds == 10 ? seconds : '0' + seconds}`
						: 'Заработай больше монет!'}
				</div>
				<div className={styles.list}>
					{tasks.map<ReactNode>(el => {
						return <EarnItem key={el.id} item={el} itemProps={itemProps} />
					})}
				</div>
				<Modal modalActive={modal} setModalActive={setModal}>
					<div className={listStyles.img__wrap}>
						<img src={info.img} className={styles.img} />
					</div>
					<div className={listStyles.menu__title}>{info.name}</div>
					<div className={listStyles.text}>{info.description}</div>
					<div className={listStyles.info}>
						<div className={listStyles.menu__price}>
							<CircleDollarSign size={30} />+{info.reward}
						</div>
					</div>
					<EarnButton
						info={info}
						setModal={setModal}
						timerActive={timerActive}
						setTimerActive={setTimerActive}
					/>
				</Modal>
			</div>
		</>
	)
}

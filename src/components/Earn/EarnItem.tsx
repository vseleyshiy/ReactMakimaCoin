import { ChevronRight, CircleDollarSign } from 'lucide-react'
import { MouseEvent, useEffect } from 'react'
import toast from 'react-hot-toast'
import styles from './Earn.module.css'
import { IItemProps, TypeTasks } from './types'

interface Props {
	item: TypeTasks
	itemProps: IItemProps
}

export function EarnItem(props: Props) {
	const { item, itemProps } = props

	useEffect(() => {
		const interval = setInterval(() => {
			if (itemProps.seconds > 0 && itemProps.timerActive) {
				itemProps.setSeconds(prev => prev - 1)
			} else {
				itemProps.setTimerActive(false)
				itemProps.setSeconds(10)
			}
		}, 1000)
		return () => clearInterval(interval)
	}, [itemProps.timerActive, itemProps.seconds])
	const onclickTask = (e: MouseEvent<HTMLDivElement>) => {
		if (!itemProps.timerActive) {
			itemProps.setInfo({
				...itemProps.info,
				id: +e.currentTarget.dataset.id!,
			})
			itemProps.setModal(prev => !prev)
		} else {
			toast.error('В данный момент у вас идет КД!')
		}
	}

	return (
		<div
			className={styles.item}
			onClick={(e: MouseEvent<HTMLDivElement>) => onclickTask(e)}
			key={item.id}
			data-id={item.id}
		>
			<div className={styles.content}>
				<div className={styles.img__wrap}>
					<img className={styles.img} src={item.img} />
				</div>
				<div className={styles.info}>
					<div className={styles.title}>{item.name}</div>
					<div className={styles.price}>
						<CircleDollarSign size={16} />+{item.reward}
					</div>
				</div>
			</div>
			<ChevronRight />
		</div>
	)
}

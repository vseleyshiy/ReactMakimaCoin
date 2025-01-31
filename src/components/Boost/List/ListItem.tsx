import { ChevronRight, CircleDollarSign } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'
import { boosts } from '../../../database'
import { IModalMenu } from '../types'
import styles from './List.module.css'

interface Props {
	data: IModalMenu
	setActive: Dispatch<SetStateAction<boolean>>
	currentModal: IModalMenu
	setCurrentModal: Dispatch<SetStateAction<IModalMenu>>
}

export function ListItem(props: Props) {
	const { data, setActive, currentModal, setCurrentModal } = props

	return (
		<li
			className={styles.item}
			onClick={e => {
				setActive(true)
				setCurrentModal({
					...currentModal,
					id: Number(e.currentTarget.dataset.id),
				})
			}}
			data-id={data.id}
		>
			<div className={styles.content}>
				<data.icon size={40} />
				<div className={styles.main}>
					<div className={styles.title}>{data.title}</div>
					<div className={styles.info}>
						<div className={styles.price}>
							{boosts.Multitap[data.lvl - 1].click === data.lvl ? (
								''
							) : (
								<CircleDollarSign size={20} />
							)}
							{boosts.Multitap[data.lvl - 1].click === data.lvl
								? '-'
								: boosts.Multitap[data.lvl - 1].price}
						</div>
						<div className={styles.lvl}>
							{boosts.Multitap[data.lvl - 1].click === data.lvl
								? `${data.lvl} lvl max`
								: `${data.lvl + 1} lvl`}
						</div>
					</div>
				</div>
			</div>
			<ChevronRight />
		</li>
	)
}

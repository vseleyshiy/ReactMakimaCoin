import { CircleDollarSign } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'
import toast from 'react-hot-toast'
import { boosts } from '../../../database'
import { useUser } from '../../../hooks/useUser'
import { Modal } from '../../../utils/Modal/Modal'
import { IModalMenu, IUpdateLvl } from '../types'
import styles from './List.module.css'

interface Props {
	info: IModalMenu
	active: boolean
	setActive: Dispatch<SetStateAction<boolean>>
}

export function ModalMenu(props: Props) {
	const { balance, setBalance } = useUser()

	const updateLvl = (fn: IUpdateLvl) => {
		if (fn.value === fn.lastLvl) {
			toast.error('Вы достигли максимального уровня!')
		} else {
			// boosts.multitap[lvlclick].price
			if (balance >= fn.price) {
				// если баланс больше или равен цене
				setBalance?.(prev => prev - fn.price) // снимаем с баланса цену товара
				fn.setFunc
				// fn.func?.(fn.value) // увеличиваем значение
			} else {
				toast.error('У вас недостаточно монет!')
			}
		}
	}

	const { info, active, setActive } = props

	return (
		<Modal modalActive={active} setModalActive={setActive}>
			<info.icon size={60} />
			<div className={styles.menu__title}>{info.title}</div>
			<div className={styles.text}>{info.text}</div>
			<div className={styles.desc}>{info.desc}</div>
			<div className={styles.info}>
				<div className={styles.menu__price}>
					{boosts.MaxEnergy[info.lvl - 1].energy === info.lastLvl ? (
						''
					) : (
						<CircleDollarSign size={30} />
					)}
					{boosts.MaxEnergy[info.lvl - 1].energy === info.lastLvl
						? '-'
						: boosts.MaxEnergy[info.lvl - 1].price}
				</div>
				<div className={styles.menu__lvl}>
					{boosts.MaxEnergy[info.lvl - 1].energy === info.lastLvl
						? `${info.lvl} lvl max`
						: `${info.lvl + 1} lvl`}
				</div>
			</div>
			<button
				style={{
					pointerEvents:
						boosts.MaxEnergy[info.lvl - 1].energy === info.lastLvl
							? 'none'
							: 'all',
				}}
				onClick={() => {
					updateLvl(info.data)
					setActive(false)
				}}
				className={`${styles.submit} ${
					boosts.MaxEnergy[info.lvl - 1].energy === info.lastLvl && styles.ex
				}`}
			>
				{boosts.MaxEnergy[info.lvl - 1].energy === info.lastLvl
					? 'Вы достигли макс. уровня'
					: 'Улучшить'}
			</button>
		</Modal>
	)
}

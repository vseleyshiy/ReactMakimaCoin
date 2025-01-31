import { BatteryCharging, MousePointerClick } from 'lucide-react'
import { useEffect, useState } from 'react'
import { boosts } from '../../../database'
import { IModalMenu, IUpdateLvl } from '../types'
import styles from './List.module.css'
import { ListItem } from './ListItem'
import { ModalMenu } from './ModalMenu'

let lvlClick = Number(sessionStorage.getItem('multitapLvl'))
let lvlMaxEnergy = Number(sessionStorage.getItem('maxEnergyLvl'))

// из бд достать
const lastLvlClick = boosts.Multitap[boosts.Multitap.length - 1].click
const lastLvlEnergy = boosts.MaxEnergy[boosts.MaxEnergy.length - 1].energy

const setLvlClick = () => {
	lvlClick++
	sessionStorage.setItem('multitapLvl', String(lvlClick))
}
const setLvlMaxEnergy = () => {
	lvlMaxEnergy++
	sessionStorage.setItem('maxEnergyLvl', String(lvlMaxEnergy))
}

const multitapData: IUpdateLvl = {
	lastLvl: lastLvlClick,
	price: boosts.Multitap[lvlClick - 1].price,
	value: boosts.Multitap[lvlClick - 1].click,
	setFunc: setLvlClick,
}
const maxEnergyData: IUpdateLvl = {
	lastLvl: lastLvlEnergy,
	price: boosts.MaxEnergy[lvlMaxEnergy - 1].price,
	value: boosts.MaxEnergy[lvlMaxEnergy - 1].energy,
	setFunc: setLvlMaxEnergy,
}

const modalMenu: IModalMenu[] = [
	{
		id: 1,
		icon: BatteryCharging,
		title: 'Energy limit',
		text: 'Увеличьте максимальное количество энергии',
		desc: '+500 энергии за улучшение',
		lvl: lvlMaxEnergy,
		lastLvl: lastLvlEnergy,
		data: maxEnergyData,
	},
	{
		id: 2,
		icon: MousePointerClick,
		title: 'Multitap',
		text: 'Увеличьте количество монет, которое вы можете заработать за одно нажатие',
		desc: '+1 монет за улучшение при клике',
		lvl: lvlClick,
		lastLvl: lastLvlClick,
		data: multitapData,
	},
]

export function List() {
	// const [activeEnergy, setActiveEnergy] = useState(false)
	const [active, setActive] = useState(false)

	// const addLvlClick = async () => {
	// 	const data = {
	// 		status: 'multitapLvl',
	// 		id: id,
	// 		multitapLvl: lvlClick,
	// 	}
	// 	await axios.post(
	// 		'https://reactmakimacoin.local/src/api/update.php',
	// 		`data=${JSON.stringify(data)}`
	// 	)
	// }

	// const addLvlMaxEnergy = async () => {
	// 	const data = {
	// 		status: 'maxEnergyLvl',
	// 		id: id,
	// 		maxEnergyLvl: lvlMaxEnergy,
	// 	}
	// 	await axios.post(
	// 		'https://reactmakimacoin.local/src/api/update.php',
	// 		`data=${JSON.stringify(data)}`
	// 	)
	// }

	// useEffect(() => {
	// 	addLvlClick()
	// }, [lvlClick])

	// useEffect(() => {
	// 	addLvlMaxEnergy()
	// }, [lvlMaxEnergy])

	const [currentModal, setCurrentModal] = useState<IModalMenu>(modalMenu[0])

	useEffect(() => {
		const item = modalMenu.find(item => item.id == currentModal?.id)
		if (item) {
			setCurrentModal(item)
		}
	}, [currentModal])

	return (
		<>
			<ul className={styles.list}>
				{modalMenu.map(item => (
					<ListItem
						key={item.id}
						currentModal={currentModal}
						setCurrentModal={setCurrentModal}
						setActive={setActive}
						data={item}
					/>
				))}
			</ul>
			<ModalMenu info={currentModal} active={active} setActive={setActive} />
		</>
	)
}

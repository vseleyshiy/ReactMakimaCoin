import { CircleDollarSign } from 'lucide-react'
import { MouseEvent, ReactNode, useEffect, useState } from 'react'
import { cards, exampleCard, user_cards } from '../../../database'
import { Modal } from '../../../utils/Modal/Modal'
import styles from '../../Boost/List/List.module.css'
import { Card } from '../Card/Card'
import { IHaveMoney, IInfo, PropsCards } from '../types'
import stylesCards from './Cards.module.css'

export function Cards(props: PropsCards) {
	const { mineRef } = props

	const [info, setInfo] = useState<IInfo>({
		id: 0,
		content: exampleCard,
	})

	const [modal, setModal] = useState(false)

	// function for backend json cards
	// const addCards = async () => {
	// везде на user_data переписать
	// сделать константы и тд как в red planner
	// 	const data = {
	// 		status: 'cards',
	// 		id: id,
	// 		user_data: user_cards,
	// 	}
	// 	await axios.post(
	// 		'https://reactmakimacoin.local/src/api/update.php',
	// 		`data=${JSON.stringify(data)}`
	// 	)
	// }

	const onclickCard = (e: MouseEvent<HTMLLIElement>) => {
		setInfo({
			id: +e.currentTarget.dataset.id!,
			content: info.content,
		})
		setModal(prev => !prev)
	}

	useEffect(() => {
		let dataCard = user_cards.find(item => item.id === info.id)
			? user_cards.find(item => item.id === info.id)
			: cards.find(item => item.id === info.id)
		if (!dataCard) return
		setInfo({
			id: info.id,
			content: dataCard,
		})
	}, [modal])

	const cardData: IHaveMoney = {
		price: info.content.price,
		value: info.content.profit,
		index: info.content.id - 1,
	}

	// const haveMoney = (fn: IHaveMoney) => {
	// 	// boosts.multitap[lvlclick].price
	// 	if (balance >= fn.price) {
	// 		// если баланс больше или равен цене
	// 		setBalance?.(prev => prev - fn.price) // снимаем с баланса цену товара
	// 		cards[fn.index].lvl += 1 // увеличиваем уровень
	// 		cards[fn.index].price = Math.floor(cards[fn.index].price * 1.2)
	// 		cards[fn.index].allProfit += cards[fn.index].profit
	// 		cards[fn.index].profit = Math.floor(cards[fn.index].profit * 1.2)
	// 		setHourProfit?.(prev => prev + fn.value) // увеличиваем значение
	// 		const dataCard = user_cards.find(item => item.id == cards[fn.index].id)
	// 		if (!dataCard) {
	// 			user_cards.push(cards[fn.index])
	// 		}
	// 		addCards()
	// 	} else {
	// 		setError(true)
	// 	}
	// }

	// function for backend hourProfit
	// const addHourProfit = async () => {
	// 	const data = {
	// 		status: 'hourProfit',
	// 		id: id,
	// 		user_data: hourProfit,
	// 	}
	// 	await axios.post(
	// 		'https://reactmakimacoin.local/src/api/update.php',
	// 		`data=${JSON.stringify(data)}`
	// 	)
	// }

	cards

	return (
		<>
			<ul className={stylesCards.list} ref={mineRef}>
				{cards.map<ReactNode>(data => {
					return (
						<li
							onClick={(e: MouseEvent<HTMLLIElement>) => onclickCard(e)}
							data-id={data.id}
							key={data.id}
							className={stylesCards.item}
							style={{
								backgroundImage: `url(${data.img})`,
							}}
						>
							<Card data={data} />
						</li>
					)
				})}
			</ul>
			<Modal modalActive={modal} setModalActive={setModal}>
				<div className={styles.img__wrap}>
					<img src={info.content.img} className={styles.img} />
				</div>
				<div className={styles.menu__title}>{info.content.name}</div>
				<div className={styles.text}>{info.content.description}</div>
				<div className={styles.desc}>
					+{info.content.profit} монет в час после улучшения
				</div>
				<div className={styles.info}>
					<div className={styles.menu__price}>
						<CircleDollarSign size={30} />
						{info.content.price}
					</div>
					<div className={styles.menu__lvl}>{info.content.lvl} lvl</div>
				</div>
				<button
					onClick={() => {
						setModal(false)
					}}
					className={styles.submit}
				>
					Улучшить
				</button>
			</Modal>
		</>
	)
}

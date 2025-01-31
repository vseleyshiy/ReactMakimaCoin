import { TypeTasks } from './components/Earn/types'
import { ICards } from './components/Mine/types'

// const getRoles = async () => {
//     const response = await axios.get('https://reactmakimacoin.local/src/api/roles.php')
//     const data = await response.data;

//     roles = data;
// }

// export let roles: TypeRoles[] = [
// 	{
// 		role: 'Bronze',
// 		for_up: 10000,
// 	},
// 	{
// 		role: 'Silver',
// 		for_up: 50000,
// 	},
// 	{
// 		role: 'Gold',
// 		for_up: 100000,
// 	},
// 	{
// 		role: 'Epic',
// 		for_up: 500000,
// 	},
// 	{
// 		role: 'Elite',
// 		for_up: 1000000,
// 	},
// ]

// getRoles()

type TypeBoosts = {
	Multitap: {
		click: number
		price: number
	}[]
	MaxEnergy: {
		energy: number
		price: number
	}[]
}

export const boosts: TypeBoosts = {
	Multitap: [
		{
			click: 2,
			price: 200,
		},
		{
			click: 3,
			price: 500,
		},
		{
			click: 4,
			price: 1000,
		},
		{
			click: 5,
			price: 2000,
		},
		{
			click: 6,
			price: 5000,
		},
	],
	MaxEnergy: [
		{
			energy: 2500,
			price: 200,
		},
		{
			energy: 3000,
			price: 500,
		},
		{
			energy: 3500,
			price: 1000,
		},
		{
			energy: 4000,
			price: 2000,
		},
		{
			energy: 4500,
			price: 5000,
		},
	],
}

export type TypeCards = {
	id: number
	name: string
	description: string
	lvl: number
	profit: number
	allProfit: number
	price: number
	img: string
}

export let cards: TypeCards[] = [
	{
		id: 1,
		name: 'Flux Development',
		description: 'Карточка компании программистов Flux Development.',
		lvl: 0,
		profit: 50,
		allProfit: 0,
		price: 200,
		img: '/public/cards_images/flux-logo-white.svg',
	},
	{
		id: 2,
		name: 'Isagi Egoist',
		description: 'Исаги Йоичи, лучший эгоист во всём футболе.',
		lvl: 0,
		profit: 200,
		allProfit: 0,
		price: 500,
		img: '/public/cards_images/isagi.jpg',
	},
	{
		id: 3,
		name: 'Bloody Gojo Satoru',
		description: 'Весёлый парень...',
		lvl: 0,
		profit: 230,
		allProfit: 0,
		price: 750,
		img: '/public/cards_images/gojo.jpg',
	},
	{
		id: 4,
		name: 'Kaneki | Manga edition',
		description: 'the guy who lost everything...',
		lvl: 0,
		profit: 1000,
		allProfit: 0,
		price: 5000,
		img: '/public/cards_images/kaneki_manga.jpg',
	},
	{
		id: 5,
		name: 'Makima <3',
		description: 'Лицо этой игры, демон порабощения.',
		lvl: 0,
		profit: 300,
		allProfit: 0,
		price: 1000,
		img: '/public/cards_images/makima.jpg',
	},
	{
		id: 6,
		name: 'Kiyotaka Ayanokoji',
		description: 'Манипулятор. Считает, что в этом мире важна только победа.',
		lvl: 0,
		profit: 600,
		allProfit: 0,
		price: 2500,
		img: '/public/cards_images/ayano.jpg',
	},
	{
		id: 7,
		name: 'Yuichi | Manga edition',
		description: '"friends are more important, than money"',
		lvl: 0,
		profit: 2000,
		allProfit: 0,
		price: 7000,
		img: '/public/cards_images/yuichi_manga.jpg',
	},
]

export let user_cards: TypeCards[] = []

// const getCards = async () => {
// 	const response = await axios.get(
// 		'https://reactmakimacoin.local/src/api/cards.php'
// 	)
// 	const data = await response.data

// 	cards = data
// }

// getCards()

export const exampleCard: ICards = {
	id: 0,
	name: 'Secret Makimacoin',
	description:
		'Секретная карта, нельзя купить и поиметь с неё прибыль, это пасхалка, которую ты нашёл <3',
	lvl: 999,
	profit: 666,
	allProfit: 777,
	price: 999999,
	img: '/public/secret_card.jpg',
}

const sortCards = (a: TypeCards, b: TypeCards): number => {
	return b.price - a.price
}

// cards = cards.sort(sortCards);

export const tasks: TypeTasks[] = [
	{
		id: 1,
		name: 'Youtube',
		description: 'Подпишитесь на канал автора этой игры',
		reward: 200,
		img: '/public/youtube_icon.svg',
		link: 'https://www.youtube.com/@vseleyshiy',
		execute: false,
	},
	{
		id: 2,
		name: 'Flux Development Rewiews',
		description: 'Подпишитесь на телеграм канал отзывовов Flux Development',
		reward: 200,
		img: '/public/telegram_icon.svg',
		link: 'https://t.me/flux_development_reviews',
		execute: false,
	},
	{
		id: 3,
		name: 'Flux Development Portfolio',
		description: 'Подпишитесь на телеграм канал портфолио Flux Development',
		reward: 200,
		img: '/public/telegram_icon.svg',
		link: 'https://t.me/flux_development_portfolio',
		execute: false,
	},
]

export let user_tasks: TypeTasks[] = []

// const getTasks = async () => {
// 	const response = await axios.get(
// 		'https://reactmakimacoin.local/src/api/tasks.php'
// 	)
// 	const data = await response.data

// 	tasks = data
// }

// getTasks()

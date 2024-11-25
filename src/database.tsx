type TypeRoles = {
    role: string;
    for_up: number;
}[]

export const roles: TypeRoles = [
    {
        role: 'Bronze',
        for_up: 1000,
    },
    {
        role: 'Silver',
        for_up: 2000,
    },
    {
        role: 'Gold',
        for_up: 3000,
    },
    {
        role: 'Epic',
        for_up: 10000,
    },
    {
        role: 'Elite',
        for_up: 30000,
    },
]

type TypeBoosts = {
    Multitap: {
        click: number;
        price: number;
    }[];
    MaxEnergy: {
        energy: number;
        price: number;
    }[];
}

export const boosts: TypeBoosts = {
    Multitap: [
        {
            'click': 2,
            'price': 200,
        },
        {
            'click': 3,
            'price': 500,
        },
        {
            'click': 4,
            'price': 1000,
        },
        {
            'click': 5,
            'price': 2000,
        },
        {
            'click': 6,
            'price': 5000,
        },
    ],
    MaxEnergy: [
        {
            'energy': 2500,
            'price': 200,
        },
        {
            'energy': 3000,
            'price': 500,
        },
        {
            'energy': 3500,
            'price': 1000,
        },
        {
            'energy': 4000,
            'price': 2000,
        },
        {
            'energy': 4500,
            'price': 5000,
        },
    ]
}

type TypeCards = {
    id: number
    name: string
    desc: string
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
        desc: 'Карточка компании программистов Flux Development.',
        lvl: 0,
        profit: 50,
        allProfit: 0,
        price: 200,
        img: '/src/assets/flux-logo-white.svg',
    },
    {
        id: 2,
        name: 'Isagi Egoist',
        desc: 'Исаги Йоичи, лучший эгоист во всём футболе.',
        lvl: 0,
        profit: 200,
        allProfit: 0,
        price: 500,
        img: '/src/assets/isagi.jpg',
    },
    {
        id: 3,
        name: 'Bloody Gojo Satoru',
        desc: 'Весёлый парень...',
        lvl: 0,
        profit: 230,
        allProfit: 0,
        price: 750,
        img: '/src/assets/gojo.jpg',
    },
    {
        id: 4,
        name: 'Kaneki Ken | Manga edition',
        desc: 'the guy who lost everything...',
        lvl: 0,
        profit: 1000,
        allProfit: 0,
        price: 5000,
        img: '/src/assets/kaneki manga.jpg',
    },
    {
        id: 5,
        name: 'Makima <3',
        desc: 'Лицо этой игры, демон порабощения.',
        lvl: 0,
        profit: 300,
        allProfit: 0,
        price: 1000,
        img: '/src/assets/makima.jpg',
    },
    {
        id: 6,
        name: 'Kiyotaka Ayanokoji',
        desc: 'Манипулятор. Считает, что в этом мире важна только победа.',
        lvl: 0,
        profit: 600,
        allProfit: 0,
        price: 2500,
        img: '/src/assets/ayano.jpg',
    },
    {
        id: 7,
        name: 'Yuichi Katagiri | Manga edition',
        desc: '"friends are more important, than money"',
        lvl: 0,
        profit: 2000,
        allProfit: 0,
        price: 7000,
        img: '/src/assets/yuichi manga.jpg',
    },
]

const sortCards = (a: TypeCards, b: TypeCards): number => {
    return b.price - a.price
}

cards = cards.sort(sortCards);


type TypeTasks = {
    title: string
    tasks: {
        id: number
        name: string
        desc: string
        reward: number
        img: string
        link: string
        execute: boolean
    }[];
}

export const tasks: TypeTasks[] = [
    {
        title: 'Подпишитесь на нас',
        tasks: [
            {
                id: 1,
                name: 'Youtube',
                desc: 'Подпишитесь на канал автора этой игры',
                reward: 500,
                img: '/public/youtube_icon.svg',
                link: 'https://www.youtube.com/@vseleyshiy',
                execute: false,
            },
            {
                id: 2,
                name: 'Flux Development Rewiews',
                desc: 'Подпишитесь на телеграм канал отзывовов Flux Development',
                reward: 500,
                img: '/public/telegram_icon.svg',
                link: 'https://t.me/flux_development_reviews',
                execute: false,
            },
            {
                id: 3,
                name: 'Flux Development Portfolio',
                desc: 'Подпишитесь на телеграм канал портфолио Flux Development',
                reward: 500,
                img: '/public/telegram_icon.svg',
                link: 'https://t.me/flux_development_portfolio',
                execute: false,
            },
        ]
    },
]
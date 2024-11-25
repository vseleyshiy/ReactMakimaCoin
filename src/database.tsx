import axios from "axios";
import { ICards } from "./components/Mine/types";

type TypeRoles = {
    role: string;
    for_up: number;
}

const getRoles = async () => {
    const response = await axios.get('https://reactmakimacoin.local/src/api/roles.php')
    const data = await response.data;

    roles = data;
}

export let roles: TypeRoles[] = [];

getRoles();

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


export let cards: TypeCards[] = [];

export let user_cards: TypeCards[] = [];

const getCards = async () => {
    const response = await axios.get('https://reactmakimacoin.local/src/api/cards.php')
    const data = await response.data;

    cards = data;
}

getCards();

export const exampleCard: ICards = {
    id: 0,
    name: 'Secret Makimacoin',
    description: 'Секретная карта, нельзя купить и поиметь с неё прибыль, это пасхалка, которую ты нашёл <3',
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


export type TypeTasks = {
    id: number
    name: string
    description: string
    reward: number
    img: string
    link: string
    execute: boolean
}

export let tasks: TypeTasks[] = [];

export let user_tasks: TypeTasks[] = [];

const getTasks = async () => {
    const response = await axios.get('https://reactmakimacoin.local/src/api/tasks.php')
    const data = await response.data;

    tasks = data;
}

getTasks();

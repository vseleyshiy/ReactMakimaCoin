export type TypeInfo = {
    id: number
    content: {
        id: number | undefined
        name: string | undefined
        description: string | undefined
        reward: number
        img: string | undefined
        link: string | undefined
        execute: boolean
    }
}

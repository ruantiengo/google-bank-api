export enum Type {
    CPF,
    Phone,
    Email
}

export class Key{
    id: number
    type: Type
    value: string
    ownerId: number
}
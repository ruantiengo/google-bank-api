import { Key } from "src/key/entities/key.entity"

export class User {
    email: string
    cpf: string
    phone: string
    name: string
    balance?: number 
    keys?: Key[]
}


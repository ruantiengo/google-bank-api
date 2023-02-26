import { Type } from "../entities/key.entity"

export class CreateKeyDto {
    type: Type
    value: string
    ownerId: number
}

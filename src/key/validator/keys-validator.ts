import { CreateKeyDto } from "../dto/create-key.dto"

export const containNotEmptyProperty = (key: CreateKeyDto): string[] => {
    const errors = []
    const elements = ["type", "value", "ownerId"]
    for (const element of elements){
        if(key[element] === "" || key[element] === null || key[element] === undefined){
            errors.push(element)
        }
    }
    if(errors.length !== 0) return errors
}
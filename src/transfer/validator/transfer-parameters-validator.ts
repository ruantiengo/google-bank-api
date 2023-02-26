import { CreateTransferDto } from "../dto/create-transfer.dto"

export const containNotEmptyProperty = (transfer: CreateTransferDto): string[] => {
    const errors = []
    const elements = ["senderId", "receiverId", "value"]
    for (const element of elements){
        if(transfer[element] === "" || transfer[element] === null || transfer[element] === undefined){
            errors.push(element)
        }
    }
    if(errors.length !== 0) return errors
}
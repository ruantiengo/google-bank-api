import { CreateUserDto } from "../dto/create-user.dto";

export const cpfValidator = (cpf: string): boolean => {
    if(cpf.length != 11){
        return false
    }
    return true;
}

export const phoneValidator = (phone: string): boolean => {
    if(phone.length != 11){
        return false;
    }
    return true;
}

export const emailValidator = (email: string): boolean => {
    if(!email.includes("@") && !email.includes(".com")){
        return false;
    }
    return true;
}

export const containNotEmptyProperty = (user: CreateUserDto): string[] => {
    const errors = []
    const elements = ["email", "cpf", "name", "phone"]
    for (const element of elements){
        if(user[element] === "" || user[element] === null || user[element] === undefined){
        
            errors.push(element)
        }
    }
    
    return errors
}
export const  serverError = {
    statusCode: 500,
    error: "Internal server error."
}

export const  invalidError = (field: string) => {
    return {
        statusCode: 500,
        error: `Error, the field ${field} is invalid.`
    }
}

export const  cpfFieldAreDifferent = {
    statusCode: 400,
    error: `Error, for create a new key with cpf type, the value must be the same of the user cpf`
}

export const  keyAlreadyUsedError = (field: string) => {
    return {
        statusCode: 400,
        error: `Error, the field ${field} is already used as a key.`
    }
}


export const  missingError = (field: string) => {
    return {
        statusCode: 400,
        error: `Error, the field ${field} is invalid.`
    }
}

export const  missingParameters = (errors: string[]) => {
    return {
        statusCode: 400,
        error: `Error, the fields ${errors.toString()} is(are) empty.`
    }
}

export const  userNotFound =  {
    statusCode: 400,
    error: `Error, this user was not found.`
}

export class CpfAlreadySignedUpError extends Error{
    constructor(){
        super("An account with this cpf already exists.")
       
    }
}

export class EmailAlreadySignedUpError extends Error{
    constructor(){
        super("An account with this email already exists.")
       
    }
}

export class PhoneAlreadySignedUpError extends Error{
    constructor(){
        super("An account with this phone already exists.")
       
    }
}
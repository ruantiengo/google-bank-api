import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { KeyService } from './key.service';
import { CreateKeyDto } from './dto/create-key.dto';
import { UpdateKeyDto } from './dto/update-key.dto';
import { Response } from 'express';
import { containNotEmptyProperty } from './validator/keys-validator';
import { Type } from './entities/key.entity';
import { cpfValidator, emailValidator, phoneValidator } from 'src/users/validator/user-validator';
import { UsersService } from 'src/users/users.service';
import { keyAlreadyUsedError, cpfFieldAreDifferent, invalidError, missingParameters, userNotFound } from 'src/users/errors/http-errors/errors';

@Controller('key')
export class KeyController {
  constructor(private readonly keyService: KeyService, private readonly userService: UsersService) {}

  @Post()
  async create(@Body() createKeyDto: CreateKeyDto, @Res() response: Response) {
  try{
    const missingParametersErrors = containNotEmptyProperty(createKeyDto)
    if(missingParametersErrors != null) return response.status(400).json(missingParameters(missingParametersErrors))

    const {ownerId, type, value} = createKeyDto
    const user = await this.userService.findById(ownerId)
    if(!user) return response.status(400).json(userNotFound)
    if(createKeyDto.type.toString() === "EMAIL" && !emailValidator(createKeyDto.value) ){
      return response.status(400).json(invalidError(Type.Email.toString()))
    }
    if(createKeyDto.type.toString() === "PHONE" && !phoneValidator(createKeyDto.value)){
      return response.status(400).json(invalidError(Type.Phone.toString()))
    }
    const chavesKeys = await this.keyService.findKeysByUserId(createKeyDto.ownerId)
    
    if(createKeyDto.type.toString() === "CPF"){
      if(user.cpf !== value) {
        return response.status(400).json(cpfFieldAreDifferent)
      }
      const cpfIsAlreadyKey = chavesKeys.filter( key => key.type.toString() === "CPF")
      if(cpfIsAlreadyKey.length != 0) return response.status(400).json(keyAlreadyUsedError("CPF"))
    }
    const keyAlreadySignedup = await this.keyService.findByValue(createKeyDto.value)
    if(keyAlreadySignedup) return response.status(400).json(keyAlreadyUsedError(createKeyDto.value))
    const newKey = await this.keyService.create(createKeyDto)
    return response.send(newKey);
  }
    catch(err){
      return response.status(500).json(err.message)
    }
    
  }

  @Delete(':id')
  async deleteById(@Param('id') id: number, @Res() response: Response) {
    try{
      return response.send(await this.keyService.deleteById(id))
    }
    catch(err){
      return response.status(500).json(err.message)
    }
  }

  @Get(':key')
  async findUserIdByKey(@Param('userId') userId: number, @Res() response: Response) {
    try{
      const keys = await this.keyService.findKeysByUserId(userId)
      return response.send(keys)
    }
    catch(err){
      return  response.status(500).json(err.message)
    }
  }

  @Get('user/:userId')
  async findKeysByUserId(@Param('userId') userId: number, @Res() response: Response) {
    try{
      const keys = await this.keyService.findKeysByUserId(userId)
      return response.send(keys)
    }
    catch(err){
      return  response.status(500).json(err.message)
    }
  }


}

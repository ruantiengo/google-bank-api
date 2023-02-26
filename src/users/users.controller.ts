import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Response } from 'express'
import { containNotEmptyProperty, cpfValidator, phoneValidator } from './validator/user-validator';
import { invalidError, missingParameters, userNotFound } from './errors/http-errors/errors';
import { AuthService } from 'src/auth/auth.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    try{
      const {email, cpf, phone, name} = createUserDto

      const parametersMissing = containNotEmptyProperty(createUserDto)
      if(parametersMissing.length != 0)  {
        return res.status(400).send(missingParameters(parametersMissing))
      }
  
      if(phoneValidator(phone) == false)  return res.status(400).send(invalidError('phone'))
      if(cpfValidator(cpf) == false)  return res.status(400).send(invalidError('cpf'))

      const user = await this.usersService.create(createUserDto);
   
      
      return res.status(200).send(user)

    } catch(err){
      return res.status(500).send(err.message)
    }
  }

  @Get(':id')
  async findById(@Param('id') id: number,@Res() res: Response) {
    try{
      const user = await this.usersService.findById(id);
      
      if(user === null) {
        return res.status(400).json(userNotFound)
      }
      return res.json(user)
    }
     catch(error){
        return res.status(500).json(error.message)
     }
  }
}

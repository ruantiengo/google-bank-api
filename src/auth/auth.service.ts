import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

import { UsersService } from 'src/users/users.service';
import { CreatePreUserDTO } from './dto/create-pre-user.dto';
import * as jwt from 'jsonwebtoken'

@Injectable()
export class AuthService {

  constructor(
    private readonly userService: UsersService,
    private readonly prisma: PrismaService
  ) {}

  async findOrCreatePreUser(createPreUserDTO: CreatePreUserDTO) {
    const preUser = await this.prisma.pRE_USER.findFirst({
      where: {
        email: createPreUserDTO.email
      }
    })
    if(!preUser){
      const newPreUser = await this.prisma.pRE_USER.create({
        data: createPreUserDTO
      })
      return newPreUser;
    }
    else return preUser
  }

  async deletePreUserByEmail(email: string) {
    const preUser = await this.prisma.pRE_USER.delete({
      where: {
        email: email
      }
    })
   
    return preUser
  }

  async validate(credentials: CreatePreUserDTO) {
    const { email, name } = credentials
    const user =  await this.userService.findByEmail(email)
    const accessToken = jwt.sign({ id: email }, process.env.GOOGLE_CLIENT_ID, {
      expiresIn: '12h'
    })
    if(!user){
      const preUser = await this.findOrCreatePreUser({email, name})
      return {
        ...preUser,
        accessToken: accessToken,
        isNewUser: true
      }
    }
    else return {
      ...user,
      accessToken: accessToken,
      isNewUser: false
    }
  }

}
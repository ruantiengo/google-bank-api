import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

import { UsersService } from 'src/users/users.service';
import { CreatePreUserDTO } from './dto/create-pre-user.dto';


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


}
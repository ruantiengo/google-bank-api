import { Injectable } from '@nestjs/common';
import { find } from 'rxjs';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { CpfAlreadySignedUpError, EmailAlreadySignedUpError, PhoneAlreadySignedUpError } from './errors/http-errors/errors';

@Injectable()
export class UsersService {

  constructor(private prisma: PrismaService) {

  }

  async create(createUserDto: CreateUserDto) {

    const alreadyExistCpf = await this.findByCpf(createUserDto.cpf)
    if(alreadyExistCpf) throw new CpfAlreadySignedUpError

    const alreadyExistEmail = await this.findByEmail(createUserDto.email)
    if(alreadyExistEmail) throw new EmailAlreadySignedUpError

    const alreadyExistPhone = await this.findByEmail(createUserDto.phone)
    if(alreadyExistPhone) throw new PhoneAlreadySignedUpError

    return await this.prisma.user.create({
      data: createUserDto
    })
  }

  async updateUserBalance(user: User, value: number){
    return await this.prisma.user.update({
      where: {
        email: user.email
      },
      data: {
        balance: user.balance + value
      }
    })
  }
  async findByCpf(cpf: string): Promise<User> {
    return await this.prisma.user.findFirst({
      where: {
        cpf
      },
      
    })
}

  findAll() {
    return `This action returns all users`;
  }

  async findByEmail(email: string): Promise<User> {
      return await this.prisma.user.findFirst({
        where: {
          email
        },
        
      })
  }

  async findById(id: number): Promise<User> {
    const user =  await this.prisma.user.findFirst({
      where: {
        id: Number(id)
      },
      
    })
    return user
}

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

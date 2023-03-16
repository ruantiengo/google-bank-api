import { Injectable } from '@nestjs/common';
import { Type } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { CreateKeyDto } from './dto/create-key.dto';
import { UpdateKeyDto } from './dto/update-key.dto';
import { Key } from './entities/key.entity';

@Injectable()
export class KeyService {

  constructor(private readonly prisma: PrismaService){}

  private _getType (type: string){
    if(type === "CPF") return Type.CPF
    else if(type === 'PHONE') return Type.PHONE
    else return Type.EMAIL
  }

  async create(createKeyDto: CreateKeyDto) {
    return await this.prisma.key.create({
      data: {
        type: this._getType(createKeyDto.type.toString()),
        value: createKeyDto.value,
        user_id: createKeyDto.ownerId
      }
    })
  }

  findAll() {
    return `This action returns all key`;
  }

  async findKeysByUserId(userId: number): Promise<Key[]>{
    const keys =  await this.prisma.key.findMany({
      where: {
        user_id: Number(userId)
      }
    })
    return keys as unknown as Key[]
  }

  async findUserIdByKey(key: string): Promise<Key[]>{
    const keys =  await this.prisma.key.findMany({
      where: {
        value: key
      }
    })
    return keys as unknown as Key[]
  }

  async findByValue(value: string) {
    return this.prisma.key.findFirst({
      where: {
        value: value
      }
    })
  }

  async deleteById(id: number) {
    return this.prisma.key.delete({
      where: {
        id: Number(id)
      }
    })
  }

  update(id: number, updateKeyDto: UpdateKeyDto) {
    return `This action updates a #${id} key`;
  }

  remove(id: number) {
    return `This action removes a #${id} key`;
  }
}

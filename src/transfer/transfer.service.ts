import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateTransferDto } from './dto/create-transfer.dto';
import { UpdateTransferDto } from './dto/update-transfer.dto';

@Injectable()
export class TransferService {
  constructor(private readonly prisma: PrismaService){}
  async create(createTransferDto: CreateTransferDto) {
    const {receiverId, senderId, value} = createTransferDto
    return await this.prisma.transfer.create({
      data: {
        value: value,
        sender_id: senderId,
        receiver_id: receiverId
      }
    })
  }

  findAll() {
    return `This action returns all transfer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transfer`;
  }

  update(id: number, updateTransferDto: UpdateTransferDto) {
    return `This action updates a #${id} transfer`;
  }

  remove(id: number) {
    return `This action removes a #${id} transfer`;
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { TransferService } from './transfer.service';
import { CreateTransferDto } from './dto/create-transfer.dto';
import { UpdateTransferDto } from './dto/update-transfer.dto';
import { UsersService } from 'src/users/users.service';
import { containNotEmptyProperty } from './validator/transfer-parameters-validator';
import { missingParameters } from 'src/users/errors/http-errors/errors';
import { Response } from 'express';

@Controller('transfer')
export class TransferController {
  constructor(private readonly transferService: TransferService, private readonly userService: UsersService) {}

 
  @Post()
  async create(@Body() createTransferDto: CreateTransferDto, @Res() response: Response) {
    try{
  
      const missingParametersErrors = containNotEmptyProperty(createTransferDto)
      if(missingParametersErrors != null) return response.status(400).json(missingParameters(missingParametersErrors))

      const {senderId, receiverId, value} = createTransferDto

      if(senderId === receiverId) return response.status(400).json("SenderId can not be equal to receiverId.")
      if(value === 0) return response.status(400).json("The value must be bigger than 0")
      const sender = await this.userService.findById(senderId)
      if(!sender) return response.status(400).json("Error, senderId not found")

      const receiver = await this.userService.findById(receiverId)
      if(!receiver) return response.status(400).json("Error, receiverId not found")

      const senderHaveAmount = sender.balance >= value
      if(senderHaveAmount === false) return response.status(400).json(`The user ${senderId} doesnt have this value`)

      await this.userService.updateUserBalance(sender, -value)
      await this.userService.updateUserBalance(receiver, +value)
    
      const transaction = await this.transferService.create(createTransferDto)
      response.send(transaction)
    }
      catch(err){
        response.status(500).json(err.message)
      }
      
  }

  @Get()
  findAll() {
    return this.transferService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transferService.findOne(+id);
  }

}

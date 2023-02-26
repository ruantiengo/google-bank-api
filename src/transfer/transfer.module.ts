import { Module } from '@nestjs/common';
import { TransferService } from './transfer.service';
import { TransferController } from './transfer.controller';
import { UsersModule } from 'src/users/users.module';
import { PrismaModule } from 'src/database/prisma.module';

@Module({
  imports: [UsersModule, PrismaModule],
  controllers: [TransferController],
  providers: [TransferService]
})
export class TransferModule {}

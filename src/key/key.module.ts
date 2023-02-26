import { Module } from '@nestjs/common';
import { KeyService } from './key.service';
import { KeyController } from './key.controller';
import { PrismaModule } from 'src/database/prisma.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports:[PrismaModule, UsersModule],
  controllers: [KeyController],
  providers: [KeyService]
})
export class KeyModule {}

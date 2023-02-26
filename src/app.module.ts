import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { PassportModule } from '@nestjs/passport';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './database/prisma.service';
import { UsersModule } from './users/users.module';
import { KeyModule } from './key/key.module';
import { TransferModule } from './transfer/transfer.module';
import { GoogleAuthMiddleware } from './auth/util/google-auth-middleware';


@Module({
  imports: [AuthModule, UsersModule, TransferModule, KeyModule, TransferModule,],
  controllers: [AppController],
  providers: [AppService, PrismaService],
  exports: [PrismaService]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(GoogleAuthMiddleware)
      .forRoutes({ path: '/', method: RequestMethod.GET });
  }
}

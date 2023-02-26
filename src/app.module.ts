import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './database/prisma.service';
import { UsersModule } from './users/users.module';
import { KeyModule } from './key/key.module';
import { TransferModule } from './transfer/transfer.module';
import { GoogleAuthMiddleware } from './auth/util/google-auth-middleware';


@Module({
  imports: [AuthModule, UsersModule, TransferModule, KeyModule, TransferModule,],
  controllers: [],
  providers: [PrismaService],
  exports: [PrismaService]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(GoogleAuthMiddleware)
      .exclude(
        {path: 'auth/google', method: RequestMethod.GET},
        {path: 'auth/google/callback', method: RequestMethod.GET},
        {path: 'api', method: RequestMethod.GET}
      )
      .forRoutes({ path: '*', method: RequestMethod.GET },)
  }
}

import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from 'src/database/prisma.module';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './util/google.strategy';
import { APP_GUARD } from '@nestjs/core';
import { GoogleAuthMiddleware } from './util/google-auth-middleware';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';

@Module({
  imports: [PrismaModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    UsersModule
  ],
  controllers: [AuthController],
  providers: [
    GoogleStrategy,
    {
      provide: APP_GUARD,
      useClass: GoogleAuthMiddleware,
    },
    AuthService
  ],
})
export class AuthModule {}

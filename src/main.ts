import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from  'dotenv'
import { PrismaService } from './database/prisma.service';

import * as session from 'express-session';
import passport from 'passport';
import { SwaggerDocumentation } from './doc/swagger/config';

async function bootstrap() {
  config()
  const app = await NestFactory.create(AppModule);
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app)
  const swagger = new SwaggerDocumentation(app)
  app.enableCors();
  await app.listen(3000);
}
bootstrap();

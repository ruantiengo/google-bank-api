import { Controller, Get, UseGuards, NestMiddleware, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';

@Controller()

export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  findOne(@Res() response: Response) {
    return response.status(400).json("Hello world")
  }
}

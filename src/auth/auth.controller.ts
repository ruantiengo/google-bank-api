import { Controller, Res, HttpStatus, Post, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { Response } from 'express'
import { CreatePreUserDTO } from './dto/create-pre-user.dto';

@Controller('auth/google')
export class AuthController {
  constructor(private readonly authService: AuthService){}

  @Post('authenticate')
  async authenticate(@Body() credentials: CreatePreUserDTO, @Res() res: Response) {
    try{
      res.send(await this.authService.validate(credentials));
    } catch(err){
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err.message)
    }
  }
}

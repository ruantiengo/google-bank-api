import { Controller, Get, UseGuards, Req, Res, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth/google')
export class AuthController {
  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Get('callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    
    return {
      user: req.user,
      isAuthenticated: req.isAuthenticated(),
    };
  }
}

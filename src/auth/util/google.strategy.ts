import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { UsersService } from 'src/users/users.service';
import { AuthService } from '../auth.service';
import * as jwt from 'jsonwebtoken'

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly userService: UsersService, private readonly authService: AuthService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback) {
    const { email, name, picture } = profile._json
    const user =  await this.userService.findByEmail(email)
    const myAccessToken = jwt.sign({ id: email }, process.env.GOOGLE_CLIENT_ID, {
      expiresIn: '12h'
    })
    if(!user){
      const preUser = await this.authService.findOrCreatePreUser({email, name})
      done(null, {
        ...preUser,
        myAccessToken,
        refreshToken,
        isNewUser: true
      })
    }
    else done(null, {
      email,
      name,
      picture,
      myAccessToken,
      refreshToken,
      isNewUser: false
    })
  }
}
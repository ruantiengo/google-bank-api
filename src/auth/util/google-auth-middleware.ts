import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as passport from 'passport';
import { OAuth2Client } from 'google-auth-library';
import * as jwt from 'jsonwebtoken'
@Injectable()
export class GoogleAuthMiddleware implements NestMiddleware {
  private readonly CLIENT_ID = process.env.GOOGLE_CLIENT_ID

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];
    console.log(token);
    
    if (token == null) {
      return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Authorization token is missing' });
    }

    try {
      const isValid = jwt.verify(token, process.env.GOOGLE_CLIENT_ID)


      if(isValid) next();
      else {
        res.redirect("auth/google")
      }
    } catch (err) {
      console.error(err);
      return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Invalid authorization token' });
    }
  }
}

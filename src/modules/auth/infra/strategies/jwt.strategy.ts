import { ENVIRONMENT } from '@/config/environment';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { TokenDTO } from '@auth/application/dtos/token.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    const jwtSecret = ENVIRONMENT.JWT.SECRET_KEY;

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtSecret,
      algorithms: ['HS256'],
    });
  }

  validate(payload: TokenDTO) {
    return payload;
  }
}

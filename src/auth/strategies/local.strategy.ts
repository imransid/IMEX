import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'my-local') {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'login',
      passwordField: 'pass',
    });
  }

  async validate(username: string, password: string): Promise<any> {
    const user = this.authService.validateUser();

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}

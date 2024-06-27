import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guards';
import { PassportLocalGuard } from './guards/passport-local.guards';
import { PassportJWTAuthGuard } from './guards/passport-jwt.guards';
import { AuthResult, CreateUserDto } from './dto/signInUserDto';
import { ActivationDTO } from './dto/signUpUserDto';
import { Response } from 'express';

@Controller('auth-v2')
export class PassportAuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @UseGuards(PassportLocalGuard)
  async login(@Request() request): Promise<any> {
    return await this.authService.signIn(request.body);
  }

  // @Get('me')
  // @UseGuards(PassportJWTAuthGuard)
  // getUserInfo() {
  //   return 'user i m';
  // }

  @Post('sign-up')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('activateUser')
  activateUser(
    @Body() activationDTO: ActivationDTO,
    @Res() response: Response,
  ) {
    return this.authService.activateUser(activationDTO, response);
  }
}

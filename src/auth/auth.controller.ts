import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';

@Controller('auth')
export class AuthController {
  // @UseGuards(AuthGuard)
  // @Get('me')
  // getUserInfo(){
  //     return null
  // }
}

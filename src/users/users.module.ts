import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { EmailService } from '../email/email.service';
import { EmailModule } from '../email/email.module';
import { PrismaService } from '../../prisma/Prisma.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    EmailModule,
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    PrismaService,
    EmailService,
    ConfigService,
    JwtService,
  ],
})
export class UsersModule {}

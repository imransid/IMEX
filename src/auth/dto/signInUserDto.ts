import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional } from 'class-validator';
import { ObjectType, Field, Directive } from '@nestjs/graphql';

@ObjectType()
export class ErrorType {
  @Field()
  message: string;

  @Field({ nullable: true })
  code?: string;
}

export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsEmail()
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  password: string;
}

export interface AuthResult {
  accessToken: string;
  user: {
    id: string;
    username: string;
  };
}

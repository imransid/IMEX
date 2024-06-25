import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional } from 'class-validator';
import { ObjectType, Field, Directive } from '@nestjs/graphql';

export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
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

export class ActivationDTO {
  @IsNotEmpty()
  @IsString()
  activationCode: string;

  @IsNotEmpty()
  @IsString()
  activationToken: string;
}

@ObjectType()
export class ErrorType {
  @Field()
  message: string;

  @Field({ nullable: true })
  code?: string;
}

@ObjectType()
export class RegisterResponse {
  @Field()
  status: string;

  @Field()
  message: string;

  @Field()
  activation_token: string;

  @Field(() => ErrorType, { nullable: true })
  error?: ErrorType;
}

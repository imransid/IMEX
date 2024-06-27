import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/Prisma.service';
import { compare, hash } from 'bcryptjs';
import { AuthResult, CreateUserDto } from './dto/signInUserDto';
import { ActivationDTO } from 'src/users/dto/create-user.dto';
import { ConfigService } from '@nestjs/config';
import { EmailService } from 'src/email/email.service';
import { Response } from 'express';
import { JwtService, JwtVerifyOptions } from '@nestjs/jwt';
import { ResponseDto } from 'src/response.dto';

interface SignInUserDto {
  login: string;
  pass: string;
}

interface IUserData {
  name: string;
  email: string;
  password: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
  ) {}

  async validateUser() {
    return {};
  }

  async signIn(user: SignInUserDto): Promise<AuthResult> {
    try {
      const { login, pass } = user;

      const foundUser = await this.prismaService.users.findUnique({
        where: { email: login },
      });

      console.log('foundUser', foundUser, user);

      if (!foundUser) {
        throw new UnauthorizedException('Invalid credentials');
      }

      // Step 2: Verify the password
      const isPasswordValid = await compare(pass, foundUser.password);

      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const tokenPayload = {
        sub: '',
        username: '',
      };

      console.log('isPasswordValid', isPasswordValid);

      const accessToken = await this.jwtService.signAsync(tokenPayload);

      let response = {
        accessToken,
        user: {
          id: foundUser.id.toString(),
          username: foundUser.name,
        },
      };

      console.log('response', response);

      return response;
    } catch (error) {}
  }

  // create activation token
  async createActivationToken(user: IUserData) {
    const activationCode = Math.floor(1000 + Math.random() * 9999).toString();

    const token = this.jwtService.sign(
      {
        user,
        activationCode,
      },
      {
        secret: this.configService.get<string>('ACTIVATION_CODE'),
        expiresIn: '5m',
      },
    );

    return { token, activationCode };
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const { name, email, password } = createUserDto;
      // Check if the user exists in the db
      const userInDb = await this.prismaService.users.findFirst({
        where: { email: createUserDto.email },
      });

      if (userInDb) {
        throw new HttpException('User already exists', HttpStatus.CONFLICT);
      }

      const user = {
        name,
        email,
        password,
      };

      const activation_token = await this.createActivationToken(user);
      const activationCode = activation_token.activationCode;

      await this.emailService.sendMail({
        email,
        subject: 'Active Your Account!.',
        name,
        template: './email',
        activationCode,
      });

      return new ResponseDto('success', 'User created successfully', {
        activationToken: activation_token.token,
      });
    } catch (error) {
      if (error instanceof HttpException) {
        throw error; // Re-throw HttpExceptions as is
      } else {
        console.log('error', error);
        throw new HttpException(
          'Internal Server Error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  // activation user
  async activateUser(activationDto: ActivationDTO, response: Response) {
    const { activationCode, activationToken } = activationDto;

    const newUser: { user: IUserData; activationCode: string } =
      this.jwtService.verify(activationToken, {
        secret: this.configService.get<string>('ACTIVATION_CODE'),
      } as JwtVerifyOptions) as { user: IUserData; activationCode: string };

    if (newUser.activationCode !== activationCode) {
      throw new BadRequestException('Invalid activation code!');
    }

    const { name, email, password } = newUser.user;

    const exitsUser = await this.prismaService.users.findUnique({
      where: {
        email,
      },
    });

    if (exitsUser) {
      throw new BadRequestException('Email already exits!');
    }

    // Hash password before storing (assuming you have a password property in CreateUserDto)
    const hashedPassword = await hash(password, 10);

    // Create the user
    const user = await this.prismaService.users.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      },
    });

    // Create a user object excluding the password
    const userResponse = {
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    };

    // Send response to the client
    return response.status(201).json({ user: userResponse });
  }
}
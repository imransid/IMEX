import { ActivationDTO, CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'prisma/Prisma.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ResponseDto } from 'src/response.dto';
import { EmailService } from '../email/email.service';
import { Response } from 'express';
interface IUserData {
    name: string;
    email: string;
    password: string;
}
export declare class UsersService {
    private readonly jwtService;
    private readonly prismaService;
    private readonly configService;
    private readonly emailService;
    constructor(jwtService: JwtService, prismaService: PrismaService, configService: ConfigService, emailService: EmailService);
    createActivationToken(user: IUserData): Promise<{
        token: string;
        activationCode: string;
    }>;
    create(createUserDto: CreateUserDto): Promise<ResponseDto<{
        activationToken: string;
    }>>;
    activateUser(activationDto: ActivationDTO, response: Response): Promise<Response<any, Record<string, any>>>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateUserDto: UpdateUserDto): string;
    remove(id: number): string;
}
export {};

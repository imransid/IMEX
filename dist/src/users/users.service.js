"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const Prisma_service_1 = require("../../prisma/Prisma.service");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const bcryptjs_1 = require("bcryptjs");
const response_dto_1 = require("../response.dto");
const email_service_1 = require("../email/email.service");
let UsersService = class UsersService {
    constructor(jwtService, prismaService, configService, emailService) {
        this.jwtService = jwtService;
        this.prismaService = prismaService;
        this.configService = configService;
        this.emailService = emailService;
    }
    async createActivationToken(user) {
        const activationCode = Math.floor(1000 + Math.random() * 9999).toString();
        const token = this.jwtService.sign({
            user,
            activationCode,
        }, {
            secret: this.configService.get('ACTIVATION_CODE'),
            expiresIn: '5m',
        });
        return { token, activationCode };
    }
    async create(createUserDto) {
        try {
            const { name, email, password } = createUserDto;
            const userInDb = await this.prismaService.users.findFirst({
                where: { email: createUserDto.email },
            });
            if (userInDb) {
                throw new common_1.HttpException('User already exists', common_1.HttpStatus.CONFLICT);
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
            return new response_dto_1.ResponseDto('success', 'User created successfully', {
                activationToken: activation_token.token,
            });
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            else {
                console.log('error', error);
                throw new common_1.HttpException('Internal Server Error', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
    async activateUser(activationDto, response) {
        const { activationCode, activationToken } = activationDto;
        const newUser = this.jwtService.verify(activationToken, {
            secret: this.configService.get('ACTIVATION_CODE'),
        });
        if (newUser.activationCode !== activationCode) {
            throw new common_1.BadRequestException('Invalid activation code!');
        }
        const { name, email, password } = newUser.user;
        const exitsUser = await this.prismaService.users.findUnique({
            where: {
                email,
            },
        });
        if (exitsUser) {
            throw new common_1.BadRequestException('Email already exits!');
        }
        const hashedPassword = await (0, bcryptjs_1.hash)(password, 10);
        const user = await this.prismaService.users.create({
            data: {
                name: name,
                email: email,
                password: hashedPassword,
            },
        });
        const userResponse = {
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
        };
        return response.status(201).json({ user: userResponse });
    }
    findAll() {
        return `This action returns all users`;
    }
    findOne(id) {
        return `This action returns a #${id} user`;
    }
    update(id, updateUserDto) {
        return `This action updates a #${id} user`;
    }
    remove(id) {
        return `This action removes a #${id} user`;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        Prisma_service_1.PrismaService,
        config_1.ConfigService,
        email_service_1.EmailService])
], UsersService);
//# sourceMappingURL=users.service.js.map
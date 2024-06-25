import { UsersService } from './users.service';
import { CreateUserDto, ActivationDTO } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<import("../response.dto").ResponseDto<{
        activationToken: string;
    }>>;
    activateUser(activationDTO: ActivationDTO, response: Response): Promise<Response<any, Record<string, any>>>;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateUserDto: UpdateUserDto): string;
    remove(id: string): string;
}

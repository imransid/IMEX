export declare class CreateUserDto {
    name: string;
    email: string;
    password: string;
}
export declare class ActivationDTO {
    activationCode: string;
    activationToken: string;
}
export declare class ErrorType {
    message: string;
    code?: string;
}
export declare class RegisterResponse {
    status: string;
    message: string;
    activation_token: string;
    error?: ErrorType;
}

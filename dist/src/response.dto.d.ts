export declare class ResponseDto<T> {
    status: string;
    message: string;
    data: T;
    error?: any;
    constructor(status: string, message: string, data: T, error?: any);
}

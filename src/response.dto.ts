import { ApiProperty } from '@nestjs/swagger';

export class ResponseDto<T> {
  @ApiProperty()
  status: string;

  @ApiProperty()
  message: string;

  @ApiProperty({ type: 'object', nullable: true })
  data: T;

  @ApiProperty({ nullable: true })
  error?: any;

  constructor(status: string, message: string, data: T, error?: any) {
    this.status = status;
    this.message = message;
    this.data = data;
    this.error = error;
  }
}

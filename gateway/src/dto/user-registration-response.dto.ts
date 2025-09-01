import { ApiProperty } from "@nestjs/swagger";

export class UserDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  phoneNumber: string;
}

export class UserRegistrationResponseDto {
  @ApiProperty({
    title: 'Message',
    type: 'string',
    default: 'Success',
  })
  readonly message: string;

  @ApiProperty({
    type: UserDto,
  })
  readonly data: UserDto;

  constructor(message: string, data: UserDto) {
    this.message = message;
    this.data = data;
  }
}

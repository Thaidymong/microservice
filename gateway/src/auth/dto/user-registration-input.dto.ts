import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserRegistrationDto {
  @ApiProperty({
    type: 'string',
    default: '087381833',
  })
  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @ApiProperty({
    type: 'string',
    default: 'Dymong@100',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}

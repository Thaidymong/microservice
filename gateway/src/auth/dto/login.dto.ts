import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Matches,
} from 'class-validator';

export class LoginDTO {
  @ApiProperty({
    type: 'string',
    default: '087381833',
  })
  @IsString({
    message: 'Phone number must be a string',
  })
  @IsNotEmpty({
    message: 'Phone Number is required',
  })
  phoneNumber: string;

  @ApiProperty({
    type: 'string',
    default: 'Dymong@100',
  })
  @IsNotEmpty({
    message: 'Password is required',
  })
  @IsStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;
}

export class LoginResponseDTO {
  accessToken: string;
  refreshToken: string;
}

export class RefreshTokenResponseDTO extends LoginResponseDTO { }

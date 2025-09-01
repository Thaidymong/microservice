import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { User } from '@prisma/client';
import { HashService } from './libs';
import { UserRegistrationDto } from './dto/user-registration-input.dto';
import { UserDto, UserRegistrationResponseDto } from './dto/user-registration-response.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly hashService: HashService,
  ) { }

  getHello(): string {
    return 'Hello Dymong!';
  }

  async create(input: UserRegistrationDto): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { phoneNumber: input.phoneNumber },
    });

    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    const hash = await new HashService().hashPassword(input.password);

    return this.prisma.user.create({ data: { phoneNumber: input.phoneNumber, password: hash } });
  }
}

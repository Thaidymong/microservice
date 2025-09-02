import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { User } from '@prisma/client';
import { UserRegistrationDto } from './dto/user-registration-input.dto';
import { LoginDTO, LoginResponseDTO } from './dto/login.dto';
import { HashService } from './libs/common/hash';
import { TokenService } from './libs/token';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly hashService: HashService,
    private readonly tokenService: TokenService,
    private readonly prismaService: PrismaService,

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

  async login(input: LoginDTO): Promise<LoginResponseDTO> {
    const user = await this.prisma.user.findUnique({
      where: { phoneNumber: input.phoneNumber },
    });
    if (!user) {
      throw new HttpException(
        'Invalid phone number or password',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const isPasswordValid = await this.hashService.comparePasswords(
      input.password,
      user.password
    )
    if (!isPasswordValid) {
      throw new HttpException(
        'Invalid phone number or password',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const { accessToken, refreshToken } =
      await this.tokenService.generateTokenPair({
        userId: user.id,
      });

    const hashedRefreshToken = await this.hashService.hashString(refreshToken);
    await this.updateHashedRefreshToken(user.id, hashedRefreshToken);

    return {
      accessToken,
      refreshToken,
    };
  }

  async updateHashedRefreshToken(id: number, hashedRefreshToken: string) {
    return await this.prisma.user.update({
      where: { id },
      // data: { hashedRefreshToken },
      data: {},
    });
  }

  async findUserById(id: number) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
      select: {
        id: true,
        phoneNumber: true,
      },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    console.log({ user })

    return user;
  }
}

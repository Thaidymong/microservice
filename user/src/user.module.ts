import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService} from './user.service';
import { PrismaModule } from './prisma/prisma.module';
import { HashService } from './libs/common/hash';
import { PrismaService } from './prisma/prisma.service';
import { TokenService } from './libs/token';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService, HashService, PrismaService, TokenService, JwtService, ConfigService],
})
export class UserModule {}

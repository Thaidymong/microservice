import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserRegistrationDto } from 'src/auth/dto/user-registration-input.dto';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { Public } from 'src/libs/decorators';
import { CurrentUserId } from 'src/libs/decorators/current-userId.decorator';
import { firstValueFrom } from 'rxjs';

@ApiTags('Authentication')
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('user-register')
  @Public()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: UserRegistrationDto })
  async registerUser(@Body() input: UserRegistrationDto) {
    // Simply pass through to the service
    return this.authService.registerUser(input);
  }

  @Post('login')
  @Public()
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Login successfully' })
  @ApiBody({ type: LoginDTO })
  async login(@Body() input: LoginDTO,) {
    return this.authService.login(input)
  }

  @Get('me')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  async me(
    @CurrentUserId() id: number,
  ) {
    console.log("gateway id", id)
   return this.authService.me(id)
  }
}

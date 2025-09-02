import { Controller, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { USER_PATTERN } from './patterns';
import { UserRegistrationDto } from './dto/user-registration-input.dto';
import { LoginDTO, LoginResponseDTO } from './dto/login.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  @MessagePattern('user.getHello')
  getHello(): string {
    return this.userService.getHello();
  }

  @MessagePattern(USER_PATTERN.CREATE)
  async register(@Payload() input: UserRegistrationDto) {
    return this.userService.create(input);
  }

  @MessagePattern(USER_PATTERN.LOGIN)
  handleLogin(@Payload() input: LoginDTO): Promise<LoginResponseDTO> {
    return this.userService.login(input);
  }

  @MessagePattern(USER_PATTERN.ME)
  handleMe(@Payload(new ParseIntPipe()) id: number) {
    return this.userService.findUserById(id);
  }
}

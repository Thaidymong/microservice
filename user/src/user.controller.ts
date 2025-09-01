import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { USER_PATTERN } from './patterns';
import { UserRegistrationDto } from './dto/user-registration-input.dto';

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
}

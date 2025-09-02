import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { UserRegistrationDto } from 'src/auth/dto/user-registration-input.dto';
import { LoginDTO } from './dto/login.dto';
import { USER_PATTERN } from './patterns';

@Injectable()
export class AuthService {
  constructor(@Inject('USER_SERVICE') private readonly client: ClientProxy) { }

  async getHello() {
    // Just proxy the response from the user service
    return firstValueFrom(
      this.client.send<string>('user.getHello', {})
    );
  }

  async registerUser(input: UserRegistrationDto) {
    // Simply forward the request to the user microservice
    // and return whatever response it provides
    return firstValueFrom(
      this.client.send(USER_PATTERN.CREATE, input)
    );
  }

  async login(input: LoginDTO) {
    return firstValueFrom(
      this.client.send(USER_PATTERN.LOGIN, input)
    );
  }

  async me(id: number) {
    return firstValueFrom(
      this.client.send<string>(USER_PATTERN.ME, { id }  )
    );
  }
}

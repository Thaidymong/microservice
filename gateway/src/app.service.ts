import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { UserRegistrationDto } from './dto/user-registration-input.dto';

@Injectable()
export class AppService {
  constructor(@Inject('USER_SERVICE') private readonly client: ClientProxy) { }

  async getHello() {
    // Just proxy the response from the user service
    return firstValueFrom(
      this.client.send<string>('user.getHello', {})
    );
  }

  async registerUser(registrationData: UserRegistrationDto) {
    // Simply forward the request to the user microservice
    // and return whatever response it provides
    return firstValueFrom(
      this.client.send('user.create', registrationData) // Make sure this pattern matches!
    );
  }
}

import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserRegistrationDto } from './dto/user-registration-input.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @ApiOperation({ summary: 'Health check' })
  async getHello() {
    return await this.appService.getHello();
  }

  @Post('user-register')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: UserRegistrationDto })
  @ApiResponse({ status: 201, description: 'User successfully registered' })
  @ApiResponse({ status: 400, description: 'Invalid input or user exists' })
  async registerUser(@Body() registrationData: UserRegistrationDto) {
    // Simply pass through to the service
    return this.appService.registerUser(registrationData);
  }
}

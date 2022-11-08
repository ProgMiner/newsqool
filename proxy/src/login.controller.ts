import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('login')
export class LoginController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.login();
  }
}

// http://52.215.151.195/review/get?attempt_id=
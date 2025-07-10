import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly configService: ConfigService) {}

  @Get()
  getData() {
    console.log(this.configService.get('API_URL'))
    return this.appService.getData();
  }

  @Get('hello')
  getHello(): string {
    return 'Hello from Nest.js!';
  }
}

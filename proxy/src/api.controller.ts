import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';


@Controller('api')
export class ApiController {
    constructor(private readonly appService: AppService) { }

    @Get('review/get')
    getHello(@Query('attempt_id') attempt_id): string {
        return attempt_id;
    }
}

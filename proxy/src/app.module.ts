import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { LoginController } from './login.controller';
import { AppService } from './app.service';
import { ApiController } from './api.controller';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
      renderPath: 'index.html'
    }),
  ],
  controllers: [LoginController, ApiController],
  providers: [AppService],
})
export class AppModule { }

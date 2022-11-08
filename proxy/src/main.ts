import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
var proxy = require('express-http-proxy');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use('/sql', proxy('http://52.215.151.195', {
    proxyReqOptDecorator: function (proxyReqOpts, srcReq) {
      console.log(proxyReqOpts)
      proxyReqOpts.headers['cookie'] = proxyReqOpts.headers['cookie1'];
      return proxyReqOpts;
    }
  }))
  await app.listen(3000);
}
bootstrap();

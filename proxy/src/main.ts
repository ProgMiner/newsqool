import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {createProxyMiddleware} from 'http-proxy-middleware';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.use('/api', createProxyMiddleware({
        target: process.env.API_SERVICE_URL,
        changeOrigin: true,
        cookieDomainRewrite: process.env.HOST,
        pathRewrite: {
            [`^/api`]: '',
        },
        proxyTimeout: 600000,
    }));

    await app.listen(process.env.PORT);
}

bootstrap();

import {Module} from '@nestjs/common';
import {ServeStaticModule} from '@nestjs/serve-static';
import {ConfigModule} from '@nestjs/config';
import {join} from 'path';

@Module({
    imports: [
        ConfigModule.forRoot(),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', '..', process.env.FRONT_PATH)
        }),
    ],
    controllers: [],
    providers: [],
})

export class AppModule {
}

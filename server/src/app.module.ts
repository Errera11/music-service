import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import * as process from "process";
import {TrackModule} from "./track/track.module";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {CommentSchema} from "./track/schemas/comment.entity";
import {TrackSchema} from "./track/schemas/track.entity";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '../.env'
        }),
        TrackModule,
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 'mysql',
                host: configService.get<string>('DB_HOST'),
                port: Number(configService.get<number>('DB_PORT')),
                username: configService.get<string>('DB_USERNAME'),
                password: configService.get<string>('DB_PASSWORD'),
                database: configService.get<string>('DB_DATABASE'),
                entities: [CommentSchema, TrackSchema],
                synchronize: true,
            }),
        }),
    ]
})
export class AppModule {};
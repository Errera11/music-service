import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import * as path from "path";
import {TrackModule} from "./track/track.module";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {CommentSchema} from "./track/schemas/comment.entity";
import {TrackSchema} from "./track/schemas/track.entity";
import {FileModule} from "./file/file.module";
import {ServeStaticModule} from "@nestjs/serve-static";
import {AlbumTrackSchema} from "./track/schemas/album_track.entity";
import {AlbumSchema} from "./track/schemas/album.entity";

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, 'static'),
        }),
        ConfigModule.forRoot({
            envFilePath: '../.env'
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 'mysql',
                host: configService.get<string>('DB_HOST'),
                port: configService.get<number>('DB_PORT'),
                username: configService.get<string>('DB_USERNAME'),
                password: configService.get<string>('DB_PASSWORD'),
                database: configService.get<string>('DB_DATABASE'),
                entities: [CommentSchema, TrackSchema, AlbumTrackSchema, AlbumSchema],
                synchronize: true,
            }),
        }),
        TrackModule,
        FileModule
    ]
})
export class AppModule {};
import {Module} from "@nestjs/common";
import {TrackController} from "./track.controller";
import {TrackService} from "./track.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {TrackSchema} from "./schemas/track.entity";
import {CommentSchema} from "./schemas/comment.entity";
import {FileService} from "../file/file.service";
import {AlbumTrackSchema} from "./schemas/album_track.entity";
import {AlbumSchema} from "./schemas/album.entity";

@Module({
    imports: [TypeOrmModule.forFeature([TrackSchema, CommentSchema, AlbumTrackSchema, AlbumSchema])],
    controllers: [TrackController],
    providers: [TrackService, FileService, AlbumTrackSchema, AlbumSchema],
})
export class TrackModule {}
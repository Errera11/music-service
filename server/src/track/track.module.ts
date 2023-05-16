import {Module} from "@nestjs/common";
import {TrackController} from "./track.controller";
import {TrackService} from "./track.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {TrackSchema} from "./schemas/track.entity";
import {CommentSchema} from "./schemas/comment.entity";

@Module({
    imports: [TypeOrmModule.forFeature([TrackSchema, CommentSchema])],
    controllers: [TrackController],
    providers: [TrackService],
})
export class TrackModule {}
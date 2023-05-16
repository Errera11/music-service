import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {TrackSchema} from "./schemas/track.entity";
import {CommentSchema} from "./schemas/comment.entity";
import {DeleteResult, Repository, SelectQueryBuilder} from "typeorm";
import {CreateTrackDto} from "./dto/create-track.dto";
import {CreateTrackCommentDto} from "./dto/create-comment.dto";


@Injectable()
export class TrackService {
    constructor(@InjectRepository(TrackSchema) private trackRepository: Repository<TrackSchema>,
                @InjectRepository(CommentSchema) private commentRepository: Repository<CommentSchema>) {}

    createTrack(dto: CreateTrackDto) : Promise<TrackSchema> {
        try {
            return this.trackRepository.save(dto);
        } catch(e) {
            console.log(e)
        }
    }

    getAllTracks(): Promise<TrackSchema[]> {
        return this.trackRepository.find();
    }

    getOneTrack(id): Promise<TrackSchema> {
        return this.trackRepository.createQueryBuilder('track')
            .leftJoinAndSelect('track.comments', 'comment')
            .where('track.id = :id', {id})
            .getOne();
    }

    deleteTrack(id): Promise<DeleteResult> {
        return this.trackRepository.delete(id)
    }

    addTrackComment(comment: CreateTrackCommentDto): Promise<CommentSchema> {
        return this.commentRepository.save(comment);
    }
}
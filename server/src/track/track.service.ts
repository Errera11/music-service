import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {TrackSchema} from "./schemas/track.entity";
import {CommentSchema} from "./schemas/comment.entity";
import {DeleteResult, Repository} from "typeorm";
import {CreateTrackDto} from "./dto/create-track.dto";
import {CreateTrackCommentDto} from "./dto/create-comment.dto";
import {FileService, FileType} from "../file/file.service";
import {AlbumSchema} from "./schemas/album.entity";
import {AlbumTrackSchema} from "./schemas/album_track.entity";
import {createAlbumDto} from "./dto/create-album.dto";

type Paginate = [TrackSchema[], number]
@Injectable()
export class TrackService {
    constructor(@InjectRepository(TrackSchema) private trackRepository: Repository<TrackSchema>,
                @InjectRepository(CommentSchema) private commentRepository: Repository<CommentSchema>,
                @InjectRepository(AlbumSchema) private albumRepository: Repository<AlbumSchema>,
                @InjectRepository(AlbumTrackSchema) private albumTrackRepository: Repository<AlbumTrackSchema>,
                private fileService: FileService) {
    }

    createTrack(dto: CreateTrackDto, image, audio): Promise<TrackSchema> {
        try {
            const imagePath = this.fileService.createFile(FileType.IMAGE, image)
            const audioPath = this.fileService.createFile(FileType.AUDIO, audio)
            return this.trackRepository.save({...dto, image: imagePath, audio: audioPath});
        } catch (e) {
            console.log(e)
        }
    }

    getAllTracks(count = 2, offset = 0): Promise<Paginate> {
        return this.trackRepository.findAndCount({
            skip: offset,
            take: count
        })
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

    incrementTrackListen(id): Promise<TrackSchema> {
        const track = this.trackRepository.findOne({where: {id}})
        this.trackRepository
            .createQueryBuilder()
            .update('track')
            .set({listens: () => 'listens + 1'})
            .where('id= :id', {id})
            .execute()
        return track;
    }

    searchTracks(searchArgs): Promise<TrackSchema[]> {
        return this.trackRepository.createQueryBuilder('track')
            .where('track.name like :searchArgs', {searchArgs: `%${searchArgs}%`
    })
            .getMany();

    }

    createAlbum(dto: createAlbumDto, file): Promise<AlbumSchema> {
        const imagePath = this.fileService.createFile(FileType.IMAGE, file)
        return this.albumRepository.save({...dto, image: imagePath})
    }

    createAlbumTrack(dto): Promise<AlbumTrackSchema> {
        return this.albumTrackRepository.save(dto)
    }

    getAlbums(count = 2, offset = 0): Promise<[AlbumSchema[], number]> {
        return this.albumRepository.findAndCount({
            skip: offset,
            take: count
        });
    }

    getOneAlbums(id: number): Promise<AlbumSchema> {
        return this.albumRepository.findOne({where: {id}});
    }

    getAlbumTracks(id: number) : Promise<TrackSchema[]> {
        return this.trackRepository.createQueryBuilder()
            .select('track')
            .from(TrackSchema, 'track')
            .where((qb) => {
                const subQuery = qb
                    .subQuery()
                    .select('album_track.trackId')
                    .from(AlbumTrackSchema, 'album_track')
                    .where('album_track.albumId = :id', {id})
                    .getQuery()
                return 'track.id IN ' + subQuery
            }).getMany()
    }

}
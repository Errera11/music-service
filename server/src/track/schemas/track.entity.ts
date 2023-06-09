import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import {CommentSchema} from "./comment.entity";
import {AlbumTrackSchema} from "./album_track.entity";

@Entity({name: 'track'})
export class TrackSchema {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    name: string;

    @Column()
    artist: string;

    @Column()
    description: string;

    @Column({default: 0})
    listens: number;

    @Column()
    image: string;

    @Column()
    audio: string;

    @OneToMany(() => CommentSchema, schema => schema.trackId)
    comments: CommentSchema[]

    @OneToMany(() => AlbumTrackSchema, schema => schema.trackId)
    albums: AlbumTrackSchema[]
}
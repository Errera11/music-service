import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import {CommentSchema} from "./comment.entity";

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

    @Column()
    listens: number;

    @Column()
    image: string;

    @Column()
    audio: string;

    @OneToMany(type => CommentSchema, schema => schema.track_id)
    comments: CommentSchema[]
}
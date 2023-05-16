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

    @Column({default: 0})
    listens: number;

    @Column({nullable: true})
    image: string;

    @Column({nullable: true})
    audio: string;

    @OneToMany(() => CommentSchema, schema => schema.trackId)
    comments: CommentSchema[]
}
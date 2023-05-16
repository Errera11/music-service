import {Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne} from 'typeorm';
import {TrackSchema} from "./track.entity";

@Entity({name: 'comment'})
export class CommentSchema {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ManyToOne(() => TrackSchema, schema => schema.id)
    trackId: number;

    @Column()
    username: string;

    @Column()
    description: string;
}
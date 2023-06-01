import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {TrackSchema} from "./track.entity";
import {AlbumSchema} from "./album.entity";

@Entity({name: 'album_track'})
export class AlbumTrackSchema {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ManyToOne(() => TrackSchema, schema => schema.id, {nullable: false})
    trackId: number;

    @ManyToOne(() => AlbumSchema, schema => schema.id, {nullable: false})
    albumId: number;


}
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {AlbumTrackSchema} from "./album_track.entity";


@Entity({name: 'album'})
export class AlbumSchema {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string

    @Column()
    description: string

    @Column()
    image: string

    @OneToMany(() => AlbumTrackSchema, schema => schema.albumId)
    albums: AlbumTrackSchema[]

}
import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';

@Entity({name: 'comment'})
export class CommentSchema {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({nullable: false})
    track_id: number;

    @Column()
    username: string;

    @Column()
    description: string;
}
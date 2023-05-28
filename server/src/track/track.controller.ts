import {Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFiles, UseInterceptors} from "@nestjs/common";
import {TrackService} from "./track.service";
import {CreateTrackDto} from "./dto/create-track.dto";
import {CreateTrackCommentDto} from "./dto/create-comment.dto";
import {FileFieldsInterceptor} from "@nestjs/platform-express";
import {FileService, FileType} from "../file/file.service";


@Controller('/track')
export class TrackController {
    constructor(private trackService: TrackService) {
    }

    @Post()
    @UseInterceptors(FileFieldsInterceptor([
        {name: 'audio', maxCount: 1},
        {name: 'image', maxCount: 1},
    ]))
    async create(@Body() dto: CreateTrackDto, @UploadedFiles() files) {
        return await this.trackService.createTrack(dto, files.image[0], files.audio[0])
    }

    @Get()
    async getAllTracks(@Query('count') count,
                       @Query('offset') offset,
                       @Query('search') searchArgs) {
        if(searchArgs) return await this.trackService.searchTracks(searchArgs);
        return await this.trackService.getAllTracks(count, offset);
    }

    @Get(':id')
    async getOneTrack(@Param('id') id) {
        return await this.trackService.getOneTrack(id);
    }

    @Delete(':id')
    async deleteOneTrack(@Param('id') id) {
        const track = await this.trackService.deleteTrack(id)
        return track;
    }

    @Post('/comment')
    async addTrackComment(@Body() dto: CreateTrackCommentDto) {
        return await this.trackService.addTrackComment(dto);
    }

    @Put('/listens/:id')
    async incrementTrackListen(@Param('id') id) {
        return await this.trackService.incrementTrackListen(id)
    }


}
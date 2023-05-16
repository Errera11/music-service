import {Body, Controller, Delete, Get, Param, Post, Res} from "@nestjs/common";
import {TrackService} from "./track.service";
import {CreateTrackDto} from "./dto/create-track.dto";
import {CreateTrackCommentDto} from "./dto/create-comment.dto";

@Controller('/track')
export class TrackController {
    constructor(private trackService: TrackService) {
    }

    @Post()
    async create(@Body() dto: CreateTrackDto) {
        return await this.trackService.createTrack(dto)
    }

    @Get()
    async getAllTracks() {
        return await this.trackService.getAllTracks();
    }

    @Get(':id')
    async getOnTrack(@Param('id') id) {
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

}
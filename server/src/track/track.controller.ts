import {Controller} from "@nestjs/common";
import {TrackService} from "./track.service";

@Controller()
export class TrackController {
    constructor(private trackService: TrackService) {
    }
}
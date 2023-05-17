import {Injectable} from "@nestjs/common";
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';

export enum FileType {
    AUDIO = 'audio',
    IMAGE ='image'
}

@Injectable()
export class FileService {

    createFile(type: FileType, file): string {
        const fileName = uuid.v4() + '.' + file.originalname.split('.').pop();
        const filePath = path.resolve(__dirname, '..', 'static', type);
        if(!fs.existsSync(filePath)) {
            fs.mkdirSync(filePath, {recursive: true});
        }
        fs.writeFileSync(path.resolve(filePath, fileName), file.buffer);
        return type + '/'  + fileName;
    }

}
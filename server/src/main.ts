import { NestFactory } from '@nestjs/core';
import {AppModule} from "./app.module";
import * as dotenv from 'dotenv';
dotenv.config()


const start = async () => {
    const PORT = process.env.PORT;
    const app = await NestFactory.create(AppModule);
    app.enableCors()
    await app.listen(PORT, () => console.log(`Started with ${PORT}`));
}

start()
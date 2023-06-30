import { Module } from '@nestjs/common';
import {DefaultService} from "./default.service";
import {DefaultController} from "./default.controller";
import {MongooseModule} from "@nestjs/mongoose";
import {Classes, ClassesSchema} from "../schemas/class.schema";

@Module({
    imports: [],
    controllers: [DefaultController],
    providers: [DefaultService]
})
export class DefaultModule {}

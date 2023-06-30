import { Module } from '@nestjs/common';
import {DefaultService} from "./default.service";
import {DefaultController} from "./default.controller";

@Module({
    imports: [],
    controllers: [DefaultController],
    providers: [DefaultService]
})
export class DefaultModule {}

import {All, Body, Controller, Get, HttpCode, Param, Post, Query} from "@nestjs/common";
import {ApiProperty, ApiTags} from "@nestjs/swagger";
import {DefaultService, ClassesType} from "./default.service";


@Controller('/')
export class DefaultController {

    @All() // Matches "*" on all methods GET, POST...
    genericFunction(){
        console.log("Generic route reached")
    }

}

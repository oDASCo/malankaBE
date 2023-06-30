import {All, Body, Controller, Get, HttpCode, Param, Post, Query} from "@nestjs/common";


@Controller('/')
export class DefaultController {

    @All() // Matches "*" on all methods GET, POST...
    genericFunction(){
        console.log("Generic route reached")
    }

}

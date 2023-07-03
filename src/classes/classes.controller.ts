import {Body, Controller, Get, HttpCode, Param, Post, Query} from "@nestjs/common";
import {ApiProperty, ApiTags} from "@nestjs/swagger";
import {ClassesService, ClassesType} from "./classes.service";


@ApiTags('Classes')
@Controller('api/classes')
export class ClassesController {

    constructor(private classesService: ClassesService) {
    }

    @Get()
    @HttpCode(200)
    async getClasses(@Query() query): Promise<ClassesType[]> {
        return await this.classesService.findAll(query);
    }

    @Post()
    @HttpCode(200)
    async createClass(@Body() data: ClassesType): Promise<ClassesType> {
        return await this.classesService.createClass(data);
    }

    @Get(':id')
    @HttpCode(200)
    async findOne(@Param() params): Promise<ClassesType> {
        return await this.classesService.findItemById(params.id);
    }
}

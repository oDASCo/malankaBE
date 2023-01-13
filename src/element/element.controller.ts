import {Body, Controller, Get, HttpCode, Param, Post, Query} from "@nestjs/common";
import {ApiProperty, ApiTags} from "@nestjs/swagger";
import {ElementService, ElementType} from "./element.service";


@ApiTags('Elements')
@Controller('api/element')
export class ElementController {

    constructor(private elementService: ElementService) {
    }

    @Get()
    @HttpCode(200)
    async getElements(@Query() query): Promise<ElementType[]> {
        return await this.elementService.findAll(query);
    }

    @Post()
    @HttpCode(200)
    async addElementItem(@Body() data: ElementType): Promise<ElementType> {
        return await this.elementService.addElementt(data);
    }

    @Get(':id')
    @HttpCode(200)
    async findOne(@Param() params): Promise<ElementType> {
        return await this.elementService.findItemById(params.id);
    }

}

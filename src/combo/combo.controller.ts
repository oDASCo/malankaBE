import {Body, Controller, Get, HttpCode, Param, Post, Query} from "@nestjs/common";
import {ApiProperty, ApiTags} from "@nestjs/swagger";
import {ComboService, ComboType} from "./combo.service";


@ApiTags('Combo')
@Controller('api/combo')
export class ComboController {

    constructor(private comboService: ComboService) {
    }

    @Get()
    @HttpCode(200)
    async getElements(@Query() query): Promise<ComboType[]> {
        return await this.comboService.findAll(query);
    }

    @Post()
    @HttpCode(200)
    async addElementItem(@Body() data: ComboType): Promise<ComboType> {
        return await this.comboService.addCombo(data);
    }

    @Get(':id')
    @HttpCode(200)
    async findOne(@Param() params): Promise<ComboType> {
        return await this.comboService.findItemById(params.id);
    }

}

import {Body, Controller, Get, HttpCode, Param, Post, Query, UploadedFile, UseInterceptors} from "@nestjs/common";
import {ApiProperty, ApiTags} from "@nestjs/swagger";
import {CatalogElementType, CatalogService} from "./catalog.service";
import {FileInterceptor} from "@nestjs/platform-express";


@ApiTags('Catalog')
@Controller('api/catalog')
export class CatalogController {

    constructor(private catalogService: CatalogService) {
    }

    @Get()
    @HttpCode(200)
    async getCatalog(@Query() query): Promise<CatalogElementType[]> {
       return await this.catalogService.findAllByParams(query);
    }

    @Post('')
    @UseInterceptors()
    async addCatalogItem(@Body() catalogItem: CatalogElementType) {
        return await this.catalogService.addToCatalog(catalogItem);
    }

    @Get(':id')
    @HttpCode(200)
    async findOne(@Param() params): Promise<CatalogElementType> {
        return await this.catalogService.findItemById(params.id);
    }

}

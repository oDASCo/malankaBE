import {Body, Controller, Get, HttpCode, Param, Post, UploadedFile, UseInterceptors} from "@nestjs/common";
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
    async getCatalog(): Promise<CatalogElementType[]> {
        return await this.catalogService.findAll();
    }

    @Post('')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Express.Multer.File, @Body() catalogItem: CatalogElementType) {
        return await this.catalogService.addToCatalog({...catalogItem, photo: '/uploads/' + file.filename});
    }

    @Post('upload-video')
    @UseInterceptors(FileInterceptor('file'))
    async uploadVideo(@UploadedFile() file: Express.Multer.File, @Body() catalogItem: CatalogElementType) {
        return await this.catalogService.updateCatalogElement({...catalogItem, video: '/uploads/' + file.filename});
    }

    @Get(':id')
    @HttpCode(200)
    async findOne(@Param() params): Promise<CatalogElementType> {
        return await this.catalogService.findItemById(params.id);
    }

}

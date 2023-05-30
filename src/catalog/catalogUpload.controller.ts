import {
    BadRequestException,
    Controller,
    HttpCode,
    Param,
    Post, Put,
    Req,
    UploadedFile,
    UseInterceptors
} from "@nestjs/common";
import {ApiTags} from "@nestjs/swagger";
import {diskStorage} from "multer";
import {FileInterceptor} from "@nestjs/platform-express";
import {CatalogService} from "./catalog.service";


const fileOptions = {
    storage: diskStorage({
        destination: './public/uploads/catalog',
        filename(req, file, cb) {
            const fileExtName = file.originalname.split('.')[1]
            const randomName = Array(4)
                .fill(null)
                .map(() => Math.round(Math.random() * 16).toString(16))
                .join('');
            return cb(null, `${file.originalname.split('.')[0]}-${randomName}.${fileExtName}`);
        },
    }),
    fileFilter: function fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif|mp4|avi|mov|MOV|ogg)$/)) {
            return cb(new Error('Only image files are allowed!'), false);
        }
        return cb(null, true);
    },
    limits: {fileSize: 10024*10024},
};

@ApiTags('Catalog Uploads')
@Controller('api/catalog/upload')
export class CatalogUploadController {

    constructor(private catalogService: CatalogService) {
    }

    @Put('/photo')
    @HttpCode(200)
    @UseInterceptors(FileInterceptor('file', fileOptions))
    async uploadCatalogPhoto(@Req() req, @UploadedFile() file: Express.Multer.File, @Param() params): Promise<any> {
        if (req.fileValidationError) {
            throw new BadRequestException(req.fileValidationError);
        }
        if (file) {
            let newCatalogPhoto = {...req.body, photo: 'uploads/catalog/' + file.filename};
            return await this.catalogService.updateCatalogElement(newCatalogPhoto);
        } else {
            throw new BadRequestException();
        }
    }

    @Put('/video')
    @HttpCode(200)
    @UseInterceptors(FileInterceptor('file', fileOptions))
    async uploadCatalogVideo(@Req() req, @UploadedFile() file: Express.Multer.File, @Param() params): Promise<any> {
        if (req.fileValidationError) {
            throw new BadRequestException(req.fileValidationError);
        }
        if (file) {
            let newCatalogVideo = {...req.body, video: 'uploads/catalog/' + file.filename};
            return await this.catalogService.updateCatalogElement(newCatalogVideo );
        } else {
            throw new BadRequestException();
        }

    }

}


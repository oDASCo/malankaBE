import {
    BadRequestException,
    Body,
    Controller,
    Get,
    HttpCode,
    Param,
    Post,
    Put,
    Req,
    UploadedFile,
    UseInterceptors
} from "@nestjs/common";
import {ApiProperty, ApiTags} from "@nestjs/swagger";
import {UsersService, UserType} from "./users.service";
import {User} from "../schemas/user.schema";
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import { extname } from 'path'
import {uuid} from "uuidv4";

@ApiTags('User photo')
@Controller('api/user-photo')
export class UserPhotoController {

    constructor(private userService: UsersService) {
    }

    @Post(':id')
    @HttpCode(200)
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './public/uploads/users',
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
            if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
                return cb(new Error('Only image files are allowed!'), false);
            }
            return cb(null, true);
        },
        limits: {fileSize: 10024*10024},
    }))
    async uploadUserPhoto(@Req() req, @UploadedFile() file: Express.Multer.File, @Param() params): Promise<User> {
        if (req.fileValidationError) {
            throw new BadRequestException(req.fileValidationError);
        }
        let newUser = {...req.body, photo: 'uploads/users/' + file.filename};
        return await this.userService.updateUser(params.id, newUser );
    }

}

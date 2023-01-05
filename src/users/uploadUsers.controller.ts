import {Body, Controller, Get, HttpCode, Param, Post, Put, UploadedFile, UseInterceptors} from "@nestjs/common";
import {ApiProperty, ApiTags} from "@nestjs/swagger";
import {UsersService, UserType} from "./users.service";
import {User} from "../schemas/user.schema";
import {FileInterceptor} from "@nestjs/platform-express";


@ApiTags('User photo')
@Controller('api/user-photo')
export class UserPhotoController {

    constructor(private userService: UsersService) {
    }

    @Post(':id')
    @HttpCode(200)
    @UseInterceptors(FileInterceptor('file'))
    async uploadUserPhoto(@UploadedFile() file: Express.Multer.File, @Param() params): Promise<User> {
        console.log(file);
        const userData = await this.userService.findItemById(params.id);
        return await this.userService.updateUser(params.id, {...userData, photo: '/uploads/' + file.originalname});
    }

}

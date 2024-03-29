import {Body, Controller, Get, HttpCode, Param, Post, Put, UploadedFile, UseInterceptors} from "@nestjs/common";
import {ApiProperty, ApiTags} from "@nestjs/swagger";
import {UsersService, UserType} from "./users.service";
import {User} from "../schemas/user.schema";
import {FileInterceptor} from "@nestjs/platform-express";


@ApiTags('User')
@Controller('api/users')
export class UsersController {

    constructor(private userService: UsersService) {
    }

    @Get()
    @HttpCode(200)
    async getUsers(): Promise<User[]> {
        return await this.userService.findAll();
    }

    @Post()
    @HttpCode(200)
    async createUser(@Body() userData: UserType): Promise<UserType> {
        return await this.userService.createUser(userData);
    }

    @Get(':username')
    @HttpCode(200)
    async findOne(@Param() params): Promise<User> {
        return await this.userService.findItemBy(params);
    }

    @Put(':id')
    @HttpCode(200)
    async updateUser(@Param() params, @Body() userData: UserType): Promise<User> {
        return await this.userService.updateUser(params.id, userData);
    }

}

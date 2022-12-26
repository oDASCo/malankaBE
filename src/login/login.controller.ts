import {Body, Controller, Get, HttpCode, Param, Post, Request, UseGuards} from "@nestjs/common";
import {ApiProperty, ApiTags} from "@nestjs/swagger";
import {AuthGuard} from "@nestjs/passport";
import {LoginService, LoginType} from "./login.service";


@ApiTags('Login')
@Controller('api/login')
export class LoginController {
    constructor(private loginService: LoginService) {}

    // @UseGuards(AuthGuard('local'))
    // @Post()
    // async login(@Body() user: LoginType) {
    //     return this.loginService.login(user);
    // }

    @UseGuards(AuthGuard('local'))
    @Post()
    async login(@Request() req: any) {
        console.log(req.body);
        return this.loginService.login(req.body);
    }

}

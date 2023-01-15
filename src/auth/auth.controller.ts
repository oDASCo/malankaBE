import {
  Body,
  Controller,
  HttpCode,
  HttpStatus, Post, Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {AuthGuard} from "@nestjs/passport";
import {UserType} from "../users/users.service";
import {ApiProperty} from "@nestjs/swagger";

export class LoginType  {
  @ApiProperty()
  username: string;
  @ApiProperty()
  password?: string;
};


@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req, @Body() userData: LoginType) {
    return this.authService.login(req.user);
  }

  // @UseGuards(RefreshJwtAuthGuard)
  // @Post('refresh-token')
  // async refreshToken(@Request() req) {
  //   return this.authService.login(req.user);
  // }
}

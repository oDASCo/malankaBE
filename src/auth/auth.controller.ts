import {
  Body,
  Controller, Get,
  HttpCode,
  HttpStatus, Post, Redirect, Req, Request, Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {AuthGuard} from "@nestjs/passport";
import {UserType} from "../users/users.service";
import {ApiProperty} from "@nestjs/swagger";
import {GoogleOauthGuard} from "../guards/google-oauth.guard";
import * as express from 'express';

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

  @Get('google')
  @UseGuards(GoogleOauthGuard)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async auth() {}


  @Get('google/callback')
  @UseGuards(GoogleOauthGuard)
  async googleAuthCallback(@Req() req, @Res() res: express.Response) {
    const token = await this.authService.login(req.user);
    console.log(token);
    res.redirect(`http://localhost:4200/dashboard?token=${token.access_token}&username=${token.username}`);

  }

  // @UseGuards(RefreshJwtAuthGuard)
  // @Post('refresh-token')
  // async refreshToken(@Request() req) {
  //   return this.authService.login(req.user);
  // }
}

import {
  Controller,
  HttpCode,
  HttpStatus, Post, Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {AuthGuard} from "@nestjs/passport";

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    console.log(123);
    console.log(req.user);
    return this.authService.login(req.user);
  }

  // @UseGuards(RefreshJwtAuthGuard)
  // @Post('refresh-token')
  // async refreshToken(@Request() req) {
  //   return this.authService.login(req.user);
  // }
}

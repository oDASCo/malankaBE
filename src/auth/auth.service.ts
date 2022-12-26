import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {UsersService, UserType} from '../users/users.service';
import * as bcrypt from 'bcrypt';
import {InjectModel} from "@nestjs/mongoose";
import {User} from "../schemas/user.schema";
import {Model} from "mongoose";

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<UserType>
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    console.log('validate  user');
    const user = await this.userModel.findOne({ username })
    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(pass, user.passwordHash)
    console.log(passwordCorrect);
    if (user && passwordCorrect) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    console.log(user);
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

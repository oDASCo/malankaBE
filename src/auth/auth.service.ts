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
    console.log(pass);
    console.log(user.passwordHash);



    let passwordCorrect =  bcrypt.compareSync(pass, user.passwordHash);
    if (user && passwordCorrect) {
      const { password, ...result } = user;
      return result;
    } else {
      return null;
    }

    // await bcrypt.compare(pass, user.passwordHash,  function(res, err) {
    //   console.log('passwordCorrect: ' + res);
    //   if (user && res) {
    //     const { password, ...result } = user;
    //     return result;
    //   } else {
    //     return null;
    //   }
    // });


  }

  async login(user: any) {
    console.log(user);
    const payload = { username: user.username, sub: user.id };
    let userForSave = {...user._doc, id: user._doc._id};
    delete userForSave.passwordHash;
    return {
      ...userForSave,
      access_token: this.jwtService.sign(payload),
    };
  }
}

import {HttpException, HttpStatus, Injectable, InternalServerErrorException} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {UsersService, UserType} from '../users/users.service';
import * as bcrypt from 'bcrypt';
import {InjectModel} from "@nestjs/mongoose";
import {User} from "../schemas/user.schema";
import {Model} from "mongoose";
import { generateFromEmail } from 'unique-username-generator';

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

    console.log(user);
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
    if (user && user.provider === 'google') {
      const userExists = await this.findUserByEmail(user.email);
      console.log(userExists);
      if (!userExists) {
        return this.registerUser(user);
      } else {
        const payload = { username: userExists['_doc'].username, sub: userExists['_doc']._id };
        console.log(user);
        return {
          ...userExists['_doc'],
          id: userExists.id,
          access_token: this.jwtService.sign(payload),
        };
      }
    } else {
      const payload = { username: user.username, sub: user.id };
      let userForSave = {...user._doc, id: user._doc._id};
      delete userForSave.passwordHash;
      return {
        ...userForSave,
        access_token: this.jwtService.sign(payload),
      };
    }


  }

  async registerUser(user) {
    try {
      const newUser = await this.userModel.create(user);
      newUser['username'] = await generateFromEmail(user.email, 5);
      newUser['photo'] = user.picture;
      newUser['role'] = 'user';

      const payload = { username: newUser['username'], sub: newUser['_id'] };
      const newItem = new this.userModel(newUser);
      newItem.save();
      return {
        ...newItem,
        id: newUser['_id'],
        access_token: this.jwtService.sign(payload),
      };

    } catch {
      throw new InternalServerErrorException();
    }
  }


  async findUserByEmail(email) {
    const user = await this.userModel.findOne({ email });

    if (!user) {
      return null;
    }

    return user;
  }

}

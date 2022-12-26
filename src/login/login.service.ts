import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {HydratedDocument, Model} from "mongoose";
import {User, UserDocument} from "../schemas/user.schema";
import {UsersService, UserType} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import {ApiProperty} from "@nestjs/swagger";
import * as bcrypt from 'bcrypt';

export class LoginType {
    @ApiProperty()
    username: string;
    @ApiProperty()
    password: string;
}


@Injectable()
export class LoginService {
    constructor(@InjectModel(User.name) private userModel: Model<UserType>,
                private usersService: UsersService,
                private jwtService: JwtService) {}


    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.userModel.findOne({ username })
        const passwordCorrect = user === null
                ? false
                : await bcrypt.compare(pass, user.passwordHash)
        if (user && passwordCorrect) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    // async login(userData: any): any {
    //     const user =await this.userModel.findOne({ username: userData.username })
    //
    //     const passwordCorrect = user === null
    //         ? false
    //         : await bcrypt.compare(userData.password, user.passwordHash)
    //
    //     if (!(user && passwordCorrect)) {
    //
    //     }
    //
    //     const userForToken = {
    //         username: user.username,
    //         id: user._id,
    //     }
    //
    //     const token = jwt.sign(userForToken, process.env.SECRET)
    //     return {...user, token}
    // }

}

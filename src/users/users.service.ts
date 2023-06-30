import {Injectable} from "@nestjs/common";
import {InjectModel, Prop} from "@nestjs/mongoose";
import {HydratedDocument, Model} from "mongoose";
import {ApiProperty} from "@nestjs/swagger";
import {User, UserDocument} from "../schemas/user.schema";
import * as bcrypt from 'bcrypt';

export class UserType {
    id: string;
    @ApiProperty()
    username: string;
    @ApiProperty()
    email: string;
    @ApiProperty()
    password?: string;
    passwordHash?: string;
    @ApiProperty()
    role?: string;
    @ApiProperty()
    photo?: string;
    provider?: string;
    name?: string;
    picture?: string;
}


@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async createUser(item: UserType): Promise<UserType> {
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(item.password, saltRounds)
        const oldUser = await this.userModel.findOne({ username: item.username })
        delete item.password;
        if (!oldUser) {
            console.log(passwordHash);
            const newItem = new this.userModel({...item, passwordHash});
            return newItem.save();
        } else {

        }

    }

    async findAll(): Promise<User[]> {
        return await this.userModel.find({});
    }

    async findItemBy(param: any): Promise<User> {
        let founded = await this.userModel.find(param);
        console.log(founded);
        return founded[0];
        //return await this.userModel.find({param});
    }

    async updateUser(id: string, data: UserType): Promise<User> {
        return await this.userModel.findByIdAndUpdate(id, data, { new: true })
    }
}

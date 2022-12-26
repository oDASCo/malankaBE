import { Module } from '@nestjs/common';
import {UsersService} from "./users.service";
import {UsersController} from "./users.controller";
import {WishlistElement, WishlistSchema} from "../schemas/wishlist.schema";
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "../schemas/user.schema";

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
    controllers: [UsersController],
    providers: [UsersService]
})
export class UsersModule {}

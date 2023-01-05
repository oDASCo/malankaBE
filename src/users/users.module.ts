import { Module } from '@nestjs/common';
import {UsersService} from "./users.service";
import {UsersController} from "./users.controller";
import {WishlistElement, WishlistSchema} from "../schemas/wishlist.schema";
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "../schemas/user.schema";
import {UserPhotoController} from "./uploadUsers.controller";

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
    controllers: [UsersController, UserPhotoController],
    providers: [UsersService]
})
export class UsersModule {}

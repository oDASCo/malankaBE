import { Module } from '@nestjs/common';
import {WishlistService} from "./wishlist.service";
import {WishlistController} from "./wishlist.controller";
import {WishlistElement, WishlistSchema} from "../schemas/wishlist.schema";
import {MongooseModule} from "@nestjs/mongoose";

@Module({
    imports: [MongooseModule.forFeature([{ name: WishlistElement.name, schema: WishlistSchema }])],
    controllers: [WishlistController],
    providers: [WishlistService]
})
export class WishlistModule {}

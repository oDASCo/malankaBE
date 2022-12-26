import { Module } from '@nestjs/common';
import {ElementService} from "./element.service";
import {ElementController} from "./element.controller";
import {WishlistElement, WishlistSchema} from "../schemas/wishlist.schema";
import {MongooseModule} from "@nestjs/mongoose";
import {Element, ElementSchema} from "../schemas/element.schema";

@Module({
    imports: [MongooseModule.forFeature([{ name: Element.name, schema: ElementSchema }])],
    controllers: [ElementController],
    providers: [ElementService]
})
export class ElementModule {}

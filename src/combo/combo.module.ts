import { Module } from '@nestjs/common';
import {ComboService} from "./combo.service";
import {ComboController} from "./combo.controller";
import {WishlistElement, WishlistSchema} from "../schemas/wishlist.schema";
import {MongooseModule} from "@nestjs/mongoose";
import {Element, ElementSchema} from "../schemas/element.schema";
import {Combo, ComboSchema} from "../schemas/combo.schema";

@Module({
    imports: [MongooseModule.forFeature([{ name: Combo.name, schema: ComboSchema }])],
    controllers: [ComboController],
    providers: [ComboService]
})
export class ComboModule {}

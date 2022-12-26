import { Module } from '@nestjs/common';
import {CatalogService} from "./catalog.service";
import {CatalogController} from "./catalog.controller";
import {WishlistElement, WishlistSchema} from "../schemas/wishlist.schema";
import {MongooseModule} from "@nestjs/mongoose";
import {CatalogElement, CatalogElementSchema} from "../schemas/catalogElement.schema";

@Module({
    imports: [MongooseModule.forFeature([{ name: CatalogElement.name, schema: CatalogElementSchema }])],
    controllers: [CatalogController],
    providers: [CatalogService]
})
export class CatalogModule {}

import { Module } from '@nestjs/common';
import {CatalogService} from "./catalog.service";
import {CatalogController} from "./catalog.controller";
import {WishlistElement, WishlistSchema} from "../schemas/wishlist.schema";
import {MongooseModule} from "@nestjs/mongoose";
import {CatalogElement, CatalogElementSchema} from "../schemas/catalogElement.schema";
import {CatalogUploadController} from "./catalogUpload.controller";

@Module({
    imports: [MongooseModule.forFeature([{ name: CatalogElement.name, schema: CatalogElementSchema }])],
    controllers: [CatalogController, CatalogUploadController],
    providers: [CatalogService]
})
export class CatalogModule {}

import {Injectable} from "@nestjs/common";
import {InjectModel, Prop} from "@nestjs/mongoose";
import {HydratedDocument, Model} from "mongoose";
import {WishlistElement, WishlistDocument, WishlistSchema} from '../schemas/wishlist.schema'
import {ApiProperty} from "@nestjs/swagger";
import {CatalogElement, CatalogElementDocument} from "../schemas/catalogElement.schema";

export class CatalogElementType {
    id: string;
    @ApiProperty()
    name: string;
    @ApiProperty()
    desc: string;
    @ApiProperty()
    category: string;
    @ApiProperty()
    photo: string;
    @ApiProperty()
    video: string;
    @ApiProperty()
    level: string;
    @ApiProperty()
    createdBy: string;
}


@Injectable()
export class CatalogService {
    constructor(@InjectModel(CatalogElement.name) private catalogModel: Model<CatalogElementDocument>) {}

    async addToCatalog(item: CatalogElementType): Promise<CatalogElement> {
        const newItem = new this.catalogModel(item);
        return newItem.save();
    }

    async findAll(): Promise<CatalogElement[]> {
        return this.catalogModel.find({});
    }

    async updateCatalogElement(item: CatalogElementType): Promise<CatalogElement> {
        return this.catalogModel.findByIdAndUpdate(item.id, item, { new: true });
    }

    async findItemById(id: string): Promise<CatalogElement> {
        return this.catalogModel.findById(id);
    }
}

import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {HydratedDocument, Model} from "mongoose";
import {WishlistElement, WishlistDocument, WishlistSchema} from '../schemas/wishlist.schema'
import {ApiProperty} from "@nestjs/swagger";

export class WishlistType {
    id: string;
    @ApiProperty()
    userId: string;
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
    catalogElementId: string
}


@Injectable()
export class WishlistService {
    constructor(@InjectModel(WishlistElement.name) private wishlistModel: Model<WishlistDocument>) {}

    async addToWishlist(item: WishlistType): Promise<WishlistElement> {
        const newItem = new this.wishlistModel(item);
        return newItem.save();
    }

    async findAll(): Promise<WishlistElement[]> {
        return this.wishlistModel.find({});
    }

    async findItemById(id: string): Promise<WishlistElement> {
        return this.wishlistModel.findById(id);
    }
}

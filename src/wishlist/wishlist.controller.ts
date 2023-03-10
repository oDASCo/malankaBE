import {Body, Controller, Get, HttpCode, Param, Post, Query} from "@nestjs/common";
import {ApiProperty, ApiTags} from "@nestjs/swagger";
import {WishlistService, WishlistType} from "./wishlist.service";


@ApiTags('Wishlist')
@Controller('api/wishlist')
export class WishlistController {

    constructor(private wishlistService: WishlistService) {
    }

    @Get()
    @HttpCode(200)
    async getWishlist(@Query() query): Promise<WishlistType[]> {
        return await this.wishlistService.findAll(query);
    }

    @Post()
    @HttpCode(200)
    async addWishlistItem(@Body() wishlistData: WishlistType): Promise<WishlistType> {
        return await this.wishlistService.addToWishlist(wishlistData);
    }

    @Get(':id')
    @HttpCode(200)
    async findOne(@Param() params): Promise<WishlistType> {
        return await this.wishlistService.findItemById(params.id);
    }

}

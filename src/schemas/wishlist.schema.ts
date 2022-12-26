import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type WishlistDocument = HydratedDocument<WishlistElement>;

@Schema()
export class WishlistElement {
    @Prop()
    id: string;
    @Prop()
    userId: string;
    @Prop()
    name: string;
    @Prop()
    desc: string;
    @Prop()
    category: string;
    @Prop()
    photo: string;
    @Prop()
    video: string;
    @Prop()
    level: string;
    @Prop()
    catalogElementId: string
}

export const WishlistSchema = SchemaFactory.createForClass(WishlistElement);

WishlistSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v

    }
})

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CatalogElementDocument = HydratedDocument<CatalogElement>;

@Schema()
export class CatalogElement {
    @Prop()
    id: string;
    @Prop()
    name: string;
    @Prop()
    desc: Array<string>;
    @Prop()
    category: string;
    @Prop()
    photo: string;
    @Prop()
    video: string;
    @Prop()
    level: string;
    @Prop()
    createdBy: string;

}

export const CatalogElementSchema = SchemaFactory.createForClass(CatalogElement);

CatalogElementSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v

    }
})

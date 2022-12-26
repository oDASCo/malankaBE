import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ElementDocument = HydratedDocument<Element>;

@Schema()
export class Element {
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
    createdBy: string;
    @Prop()
    learnDate: string;
    @Prop()
    catalogElementId: string;
}

export const ElementSchema = SchemaFactory.createForClass(Element);

ElementSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v

    }
})

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ComboDocument = HydratedDocument<Combo>;

@Schema()
export class Combo {
    @Prop()
    id: string;
    @Prop()
    userId: string;
    @Prop()
    name: string;
    @Prop()
    elements: [];
    @Prop()
    category: string;
}

export const ComboSchema = SchemaFactory.createForClass(Combo);

ComboSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v

    }
})

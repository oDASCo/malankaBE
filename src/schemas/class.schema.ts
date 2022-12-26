import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ClassesDocument = HydratedDocument<Classes>;

@Schema()
export class Classes {
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

export const ClassesSchema = SchemaFactory.createForClass(Classes);

ClassesSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v

    }
})

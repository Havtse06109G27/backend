import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema()
export class Image extends Document {
    @Prop()
    name: string;

    @Prop()
    size: string;

    @Prop()
    type: string;

    @Prop()
    createdAt: Date;

    @Prop()
    concept: string;
}

export const ImageSchema = SchemaFactory.createForClass(Image);
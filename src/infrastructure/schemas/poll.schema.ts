import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, SchemaType, SchemaTypes } from "mongoose";

export type MongoPollDocument = HydratedDocument<MongoPoll>;
@Schema()
export class MongoPoll {
    @Prop()
    _id: string;
    
    @Prop()
    question: string;

    @Prop()
    options: Array<{
        _id: string;
        title: string;
    }>;

    @Prop()
    startDate: Date;

    @Prop()
    endDate: Date;
}

export const MongoPollSchema = SchemaFactory.createForClass(MongoPoll);


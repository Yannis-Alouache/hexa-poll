import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type MongoPollDocument = HydratedDocument<MongoPoll>;
@Schema()
export class MongoPoll {
    @Prop()
    _id: string;
    
    @Prop()
    question: string;

    @Prop()
    options: Array<{
        id: string;
        title: string;
    }>;
}

export const MongoPollSchema = SchemaFactory.createForClass(MongoPoll);


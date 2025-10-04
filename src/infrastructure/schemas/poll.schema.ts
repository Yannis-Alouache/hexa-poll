import { Schema } from "@nestjs/mongoose";


@Schema()
export class Poll {
    _id: string;
    question: string;
    options: Array<{
        id: string;
        title: string;
    }>;
}
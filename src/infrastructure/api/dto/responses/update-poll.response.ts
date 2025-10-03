import { ApiProperty } from "@nestjs/swagger";
import { OptionResponse } from "./option.response";

export class UpdatePollResponse {
    @ApiProperty({
        description: "The id of the poll",
        example: "123",
    })
    id: string;

    @ApiProperty({
        description: "The question of the poll",
        example: "What is your favorite color ?",
    })
    question: string;

    @ApiProperty({
        description: "The options of the poll",
    })
    options: OptionResponse[];
}
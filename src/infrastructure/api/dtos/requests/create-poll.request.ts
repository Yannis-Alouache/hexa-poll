// {
//     "question": "What is your favorite color ?",
//     "options": [
//         {
//             "id": "123",
//             "name": "Red"
//         }
//     ]
// }


import { IsDate, IsNotEmpty, IsString } from "class-validator";
import { CreateOptionRequest } from "./create-option.request";
import { ApiProperty } from "@nestjs/swagger";

export class CreatePollRequest {
    @ApiProperty({
        description: "The question of the poll",
        example: "What is your favorite color ?",
    })
    @IsString()
    question: string;

    @ApiProperty({
        description: "The options of the poll",
        example: [
            { title: "Red" },
            { title: "Blue" },
        ],
    })
    options: CreateOptionRequest[];

    @ApiProperty({
        description: "The start date of the poll",
        example: "2023-01-01T00:00:00.000Z",
    })
    @IsDate()
    startDate: Date;

    @ApiProperty({
        description: "The end date of the poll",
        example: "2023-01-02T00:00:00.000Z",
    })
    @IsDate()
    endDate: Date;
}
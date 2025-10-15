// {
//     "question": "What is your favorite color ?",
//     "options": [
//         {
//             "id": "123",
//             "name": "Red"
//         }
//     ],
//     "startDate": "2023-01-01T00:00:00.000Z",
//     "endDate": "2023-01-02T00:00:00.000Z"
// }


import { ArrayNotEmpty, IsArray, IsDate, IsNotEmpty, IsString } from "class-validator";
import { CreateOptionRequest } from "./create-option.request";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";

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
    @Type(() => CreateOptionRequest)
    @IsArray()
    @ArrayNotEmpty()
    options: CreateOptionRequest[];

    @ApiProperty({
        description: "The start date of the poll",
        example: "2023-01-01T00:00:00.000Z",
    })
    @Type(() => Date)
    @IsDate()
    startDate: Date;

    @ApiProperty({
        description: "The end date of the poll",
        example: "2023-01-02T00:00:00.000Z",
    })
    @Type(() => Date)
    @IsDate()
    endDate: Date;
}
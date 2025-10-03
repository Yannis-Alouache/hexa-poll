// {
//     "question": "What is your favorite color ?",
//     "options": [
//         {
//             "id": "123",
//             "name": "Red"
//         }
//     ]
// }


import { CreateOptionRequest } from "./create-option.request";
import { ApiProperty } from "@nestjs/swagger";

export class CreatePollRequest {
    @ApiProperty({
        description: "The question of the poll",
        example: "What is your favorite color ?",
    })
    question: string;

    @ApiProperty({
        description: "The options of the poll",
        example: [
            { id: "123", title: "Red" },
        ],
    })
    options: CreateOptionRequest[];
}
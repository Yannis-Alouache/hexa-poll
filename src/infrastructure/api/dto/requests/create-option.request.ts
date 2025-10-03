// {
//     "id": "123",
//     "name": "Red"
// }

import { ApiProperty } from "@nestjs/swagger";


export class CreateOptionRequest {
    @ApiProperty({
        description: "The id of the option",
        example: "123",
    })
    id: string;

    @ApiProperty({
        description: "The title of the option",
        example: "Red",
    })
    title: string;
}
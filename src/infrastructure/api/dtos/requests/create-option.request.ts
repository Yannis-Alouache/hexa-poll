// {
//     "name": "Red"
// }

import { ApiProperty } from "@nestjs/swagger";


export class CreateOptionRequest {
    @ApiProperty({
        description: "The title of the option",
        example: "Red",
    })
    title: string;
}
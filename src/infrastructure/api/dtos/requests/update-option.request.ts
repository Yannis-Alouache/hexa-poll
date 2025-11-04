// {
//     "id": "123",
//     "name": "Red"
// }

import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";


export class UpdateOptionRequest {
    @ApiProperty({
        description: "The id of the option",
        example: "124",
    })
    @IsString()
    id: string;


    @ApiProperty({
        description: "The title of the option",
        example: "Red",
    })
    @IsString()
    title: string;
}
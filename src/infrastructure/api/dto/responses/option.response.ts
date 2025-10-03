import { ApiProperty } from "@nestjs/swagger";

export class OptionResponse {
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
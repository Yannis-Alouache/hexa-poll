import { ApiProperty } from "@nestjs/swagger";

export class CreatePollResponse {
    @ApiProperty({
        description: "The id of the poll",
        example: "123",
    })
    id: string;
}
import { ApiProperty } from "@nestjs/swagger";

export class DeletePollRequest {
    @ApiProperty({
        description: "The id of the poll",
        example: "123",
    })
    id: string;
}
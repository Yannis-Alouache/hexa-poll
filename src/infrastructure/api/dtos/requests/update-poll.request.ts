import { ApiProperty } from "@nestjs/swagger";
import { ArrayNotEmpty, IsArray, IsDate, IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { UpdateOptionRequest } from "./update-option.request";

export class UpdatePollRequest {
    @ApiProperty({
        description: "The question of the poll",
        example: "What is your favorite color ?",
    })
    @IsString()
    @IsNotEmpty()
    question: string;


    @ApiProperty({
        description: "The options of the poll",
        example: [
            { id: "124", title: "Red" },
            { id: "125", title: "Blue" },
        ],
    })
    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => UpdateOptionRequest)
    options: UpdateOptionRequest[];

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
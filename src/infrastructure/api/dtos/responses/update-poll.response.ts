import { ApiProperty } from '@nestjs/swagger';
import { OptionResponse } from './option.response';
import { Type } from 'class-transformer';

export class UpdatePollResponse {
  constructor(
    id: string,
    question: string,
    options: OptionResponse[],
    startDate: Date,
    endDate: Date,
  ) {
    this.id = id;
    this.question = question;
    this.options = options;
    this.startDate = startDate;
    this.endDate = endDate;
  }

  @ApiProperty({
    description: 'The id of the poll',
    example: '123',
  })
  id: string;

  @ApiProperty({
    description: 'The question of the poll',
    example: 'What is your favorite color ?',
  })
  question: string;

  @ApiProperty({
    description: 'The options of the poll',
  })
  @Type(() => OptionResponse)
  options: OptionResponse[];

  @ApiProperty({
    description: 'The start date of the poll',
    example: '2022-01-01T00:00:00.000Z',
  })
  @Type(() => Date)
  startDate: Date;

  @ApiProperty({
    description: 'The end date of the poll',
    example: '2022-01-02T00:00:00.000Z',
  })
  @Type(() => Date)
  endDate: Date;
}

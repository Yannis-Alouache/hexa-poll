import { ApiProperty } from '@nestjs/swagger';

export class CreatePollResponse {
  constructor(id: string) {
    this.id = id;
  }

  @ApiProperty({
    description: 'The id of the poll',
    example: '123',
  })
  id: string;
}

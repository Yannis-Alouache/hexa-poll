// {
//     "name": "Red"
// }

import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateOptionRequest {
  @ApiProperty({
    description: 'The title of the option',
    example: 'Red',
  })
  @IsString()
  title: string;
}

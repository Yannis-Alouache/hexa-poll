import { HttpException, HttpStatus } from '@nestjs/common';

export class StartDateAfterEndDateException extends HttpException {
  constructor() {
    super(
      'The start date cannot be after the end date',
      HttpStatus.BAD_REQUEST,
    );
  }
}

import { HttpException, HttpStatus } from "@nestjs/common";

export class StartDateInThePastException extends HttpException {
    constructor() {
        super("The start date cannot be in the past", HttpStatus.BAD_REQUEST);
    }
}
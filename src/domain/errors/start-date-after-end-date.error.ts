export class StartDateAfterEndDateError extends Error {
    constructor() {
        super("The start date cannot be after the end date");
    }
}
export class StartDateInThePastError extends Error {
    constructor() {
        super("The start date cannot be in the past");
    }
}
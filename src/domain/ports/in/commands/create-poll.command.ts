import { Command } from "@nestjs/cqrs";
import { CreatePollResponse } from "../../../../infrastructure/api/dtos/responses/create-poll.response";

export class CreatePollCommand extends Command<CreatePollResponse> {
    constructor(
        public readonly question: string,
        public readonly options: { title: string }[],
        public readonly startDate: Date,
        public readonly endDate: Date
    ) {
        super();
    }
}
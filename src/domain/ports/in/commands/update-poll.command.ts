import { Command } from "@nestjs/cqrs";
import { PollEntity } from "src/infrastructure/persistence-models/poll-entity";

export class UpdatePollCommand extends Command<PollEntity> {
    constructor(
        public readonly question: string,
        public readonly options: { title: string }[],
    ) {
        super();
    }
}
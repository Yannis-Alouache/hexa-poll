import { Command } from "@nestjs/cqrs";

export class CreatePollCommand extends Command<string> {
    constructor(
        public readonly question: string,
        public readonly options: { id: string; title: string }[]
    ) {
        super();
    }
}
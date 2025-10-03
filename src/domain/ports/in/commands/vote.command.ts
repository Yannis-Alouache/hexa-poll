import { Command } from "@nestjs/cqrs";

export class VoteCommand extends Command<void> {
    constructor(
        public readonly pollId: string,
        public readonly optionId: string
    ) {
        super();
    }
}
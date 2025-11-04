import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Poll } from "../../../domain/models/poll/poll";
import { UpdatePollCommand } from "../../../domain/ports/in/commands/update-poll.command";
import type { PollRepository } from "../../../domain/ports/out/repositories/poll-repository";

@CommandHandler(UpdatePollCommand)
export class UpdatePollCommandHandler implements ICommandHandler<UpdatePollCommand, Poll> {

    constructor(
        @Inject('PollRepository')
        private readonly pollRepository: PollRepository
    ) {}
    
    async execute(command: UpdatePollCommand): Promise<Poll> {
        
        let poll = Poll.create({
            id: command.id,
            question: command.question,
            options: command.options,
            startDate: command.startDate,
            endDate: command.endDate,
        });

        await this.pollRepository.save(poll);

        return poll;
    }
}
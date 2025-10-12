import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Poll } from "../../../domain/models/poll/poll";
import { CreatePollCommand } from "../../../domain/ports/in/commands/create-poll.command";
import type { PollRepository } from "../../../domain/ports/out/repositories/poll-repository";
import { Inject } from "@nestjs/common";
import type { IdGenerator } from "../../../domain/ports/out/id-generator";
import { CreatePollResponse } from "../../../infrastructure/api/dtos/responses/create-poll.response";


@CommandHandler(CreatePollCommand)
export class CreatePollCommandHandler implements ICommandHandler<CreatePollCommand, CreatePollResponse> {

    constructor(
        @Inject('PollRepository')
        private readonly pollRepository: PollRepository,
    
        @Inject('IdGenerator')
        private readonly idGenerator: IdGenerator,
    ) {}

    async execute(command: CreatePollCommand): Promise<CreatePollResponse> {
        let pollId = this.idGenerator.generate();
        
        let poll = Poll.create({
            id: pollId,
            question: command.question,
            options: command.options.map(option => ({
                id: this.idGenerator.generate(),
                title: option.title,
            })),
            startDate: command.startDate,
            endDate: command.endDate,
        });

        await this.pollRepository.save(poll);

        return new CreatePollResponse(pollId);
    }
}
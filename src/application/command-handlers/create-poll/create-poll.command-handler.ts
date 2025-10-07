import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Poll } from "../../../domain/models/poll";
import { CreatePollCommand } from "../../../domain/ports/in/commands/create-poll.command";
import type { PollRepository } from "../../../domain/ports/out/repositories/poll-repository";
import { Inject } from "@nestjs/common";
import type { IdGenerator } from "../../../domain/ports/out/id-generator";
import { Option } from "../../../domain/models/option";


@CommandHandler(CreatePollCommand)
export class CreatePollCommandHandler implements ICommandHandler<CreatePollCommand, string> {

    constructor(
        @Inject('PollRepository')
        private readonly pollRepository: PollRepository,
    
        @Inject('IdGenerator')
        private readonly idGenerator: IdGenerator,
    ) {}

    async execute(command: CreatePollCommand): Promise<string> {
        let id = this.idGenerator.generate();
        
        let poll = Poll.create({
            id: id,
            question: command.question,
            options: command.options.map(option => Option.create({id: this.idGenerator.generate(), title: option.title}))
        });

        await this.pollRepository.save(poll);

        return id;
    }
}
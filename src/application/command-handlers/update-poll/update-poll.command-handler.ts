import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Poll } from "src/domain/models/poll";
import { UpdatePollCommand } from "src/domain/ports/in/commands/update-poll.command";
import { PollEntity } from "src/infrastructure/persistence-models/poll-entity";

@CommandHandler(UpdatePollCommand)
export class UpdatePollCommandHandler implements ICommandHandler<UpdatePollCommand, Poll> {
    execute(command: UpdatePollCommand): Promise<PollEntity> {
        throw new Error("Method not implemented.");
    }
}
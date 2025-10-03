import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreatePollCommand } from "src/domain/ports/in/commands/create-poll.command";

@CommandHandler(CreatePollCommand)
export class CreatePollCommandHandler implements ICommandHandler<CreatePollCommand, string> {
    execute(command: CreatePollCommand): Promise<string> {
        throw new Error("Method not implemented.");
    }
}
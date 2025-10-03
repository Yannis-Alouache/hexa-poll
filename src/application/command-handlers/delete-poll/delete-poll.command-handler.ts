import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DeletePollCommand } from "src/domain/ports/in/commands/delete-poll.command";

@CommandHandler(DeletePollCommand)
export class DeletePollCommandHandler implements ICommandHandler<DeletePollCommand, void> {
    execute(command: DeletePollCommand): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
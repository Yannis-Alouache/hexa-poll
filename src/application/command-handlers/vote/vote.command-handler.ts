import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { VoteCommand } from "src/domain/ports/in/commands/vote.command";

@CommandHandler(VoteCommand)
export class VoteCommandHandler implements ICommandHandler<VoteCommand, void> {
    execute(command: VoteCommand): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
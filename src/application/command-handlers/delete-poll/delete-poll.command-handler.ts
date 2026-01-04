import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeletePollCommand } from '../../../domain/ports/in/commands/delete-poll.command';
import type { PollRepository } from '../../../domain/ports/out/repositories/poll-repository';
import { Inject } from '@nestjs/common';

@CommandHandler(DeletePollCommand)
export class DeletePollCommandHandler
  implements ICommandHandler<DeletePollCommand, void>
{
  constructor(
    @Inject('PollRepository')
    private readonly pollRepository: PollRepository,
  ) {}

  execute(command: DeletePollCommand): Promise<void> {
    return this.pollRepository.delete(command.id);
  }
}

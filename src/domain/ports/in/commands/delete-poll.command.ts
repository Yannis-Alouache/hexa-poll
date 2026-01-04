import { Command } from '@nestjs/cqrs';

export class DeletePollCommand extends Command<void> {
  constructor(public readonly id: string) {
    super();
  }
}

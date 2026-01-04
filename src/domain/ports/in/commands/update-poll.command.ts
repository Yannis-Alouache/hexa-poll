import { Command } from '@nestjs/cqrs';
import { Poll } from 'src/domain/models/poll/poll';

export class UpdatePollCommand extends Command<Poll> {
  constructor(
    public readonly id: string,
    public readonly question: string,
    public readonly options: { id: string; title: string }[],
    public readonly startDate: Date,
    public readonly endDate: Date,
  ) {
    super();
  }
}

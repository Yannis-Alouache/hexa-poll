import { Poll } from 'src/domain/models/poll/poll';
import { PollRepository } from 'src/domain/ports/out/repositories/poll-repository';

export class InMemoryPollRepository implements PollRepository {
  private database: Poll[] = [];

  async save(poll: Poll): Promise<void> {
    const index = this.database.findIndex(
      (p) => p.toPersistence()._id === poll.toPersistence()._id,
    );

    if (index === -1) this.database.push(poll);
    else this.database[index] = poll;
  }

  async update(poll: Poll): Promise<Poll> {
    throw new Error('Method not implemented.');
  }

  async delete(id: string): Promise<void> {
    this.database = this.database.filter((p) => p.toPersistence()._id !== id);
    return;
  }

  async findById(id: string): Promise<Poll> {
    const poll = this.database.find((p) => p.toPersistence()._id === id);
    if (!poll) throw new Error('Poll not found');
    return poll;
  }

  async findAll(): Promise<Poll[]> {
    return this.database;
  }
}

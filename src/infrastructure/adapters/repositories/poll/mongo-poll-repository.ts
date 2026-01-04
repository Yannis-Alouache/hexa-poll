import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Poll } from '../../../../domain/models/poll/poll';
import { PollRepository } from '../../../../domain/ports/out/repositories/poll-repository';
import { MongoPoll } from '../../../schemas/poll.schema';
import { PollNotFoundException } from '../../../../domain/errors/poll-not-found.exception';
import { PollMapper } from '../../../mappers/poll-mapper';

@Injectable()
export class MongoPollRepository implements PollRepository {
  constructor(
    @InjectModel(MongoPoll.name)
    private readonly pollModel: Model<MongoPoll>,
  ) {}

  async save(poll: Poll): Promise<void> {
    const pollPersistance = new this.pollModel(poll.toPersistence());
    await pollPersistance.save();
  }

  async update(poll: Poll): Promise<Poll> {
    const pollData = poll.toPersistence();
    const pollPersistance = await this.pollModel.findByIdAndUpdate(
      pollData._id,
      pollData,
      { new: true },
    );

    if (!pollPersistance) throw new PollNotFoundException();
    return PollMapper.toDomain(pollPersistance);
  }

  async delete(id: string): Promise<void> {
    const poll = this.pollModel.findById(id);
    await poll.deleteOne();
  }

  async findById(id: string): Promise<Poll> {
    const poll = await this.pollModel.findById(id);
    if (!poll) throw new PollNotFoundException();

    return PollMapper.toDomain(poll);
  }

  findAll(): Promise<Poll[]> {
    throw new Error('Method not implemented.');
  }
}

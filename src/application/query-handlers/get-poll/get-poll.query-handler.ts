import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetPollQuery } from 'src/domain/ports/in/queries/get-poll.query';
import { PollEntity } from 'src/infrastructure/persistence-models/poll-entity';

@QueryHandler(GetPollQuery)
export class GetPollQueryHandler
  implements IQueryHandler<GetPollQuery, PollEntity>
{
  execute(query: GetPollQuery): Promise<PollEntity> {
    throw new Error('Method not implemented.');
  }
}

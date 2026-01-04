import { InMemoryPollRepository } from '../../../infrastructure/adapters/repositories/poll/in-memory-poll-repository';
import { DeletePollCommand } from '../../../domain/ports/in/commands/delete-poll.command';
import { DeletePollCommandHandler } from './delete-poll.command-handler';
import { Poll } from '../../../domain/models/poll/poll';
import { CreatePollCommand } from 'src/domain/ports/in/commands/create-poll.command';
import { CreatePollCommandHandler } from '../create-poll/create-poll.command-handler';
import { InMemoryIdGenerator } from '../../../infrastructure/adapters/id-generator/in-memory-id-generator';
import { CreatePollFixtures } from '../../../../tests/shared/create-poll-fixtures';

describe('Delete A Poll', () => {
  let pollRepository: InMemoryPollRepository;

  beforeEach(() => {
    pollRepository = new InMemoryPollRepository();
    saveCampaign(CreatePollFixtures.validCommand());
  });

  it('delete a poll successfully', async () => {
    const command = new DeletePollCommand('1');
    await execute(command);

    const polls = await pollRepository.findAll();
    expect(polls.length).toBe(0);
  });

  async function execute(command: DeletePollCommand): Promise<void> {
    const commandHandler = new DeletePollCommandHandler(pollRepository);
    return commandHandler.execute(command);
  }

  async function saveCampaign(command: CreatePollCommand): Promise<void> {
    const commandHandler = new CreatePollCommandHandler(
      pollRepository,
      new InMemoryIdGenerator(),
    );
    commandHandler.execute(command);
  }
});

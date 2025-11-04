import { UpdatePollCommandHandler } from "./update-poll.command-handler";
import { InMemoryPollRepository } from "../../../infrastructure/adapters/repositories/poll/in-memory-poll-repository";
import { InMemoryIdGenerator } from "../../../infrastructure/adapters/id-generator/in-memory-id-generator";
import { Poll } from "../../../domain/models/poll/poll";
import { UpdatePollCommand } from "../../../domain/ports/in/commands/update-poll.command";
import { tomorrow, twoDaysFromNow } from "../../../../tests/shared/dates.fixture";
import { CreatePollCommand } from "src/domain/ports/in/commands/create-poll.command";
import { CreatePollCommandHandler } from "../create-poll/create-poll.command-handler";
import { CreatePollFixtures } from "../../../../tests/shared/create-poll-fixtures";


describe('Updates A Poll', () => {
    let pollRepository: InMemoryPollRepository;
    let idGenerator: InMemoryIdGenerator;

    beforeEach(() => {
        pollRepository = new InMemoryPollRepository();
        idGenerator = new InMemoryIdGenerator();

        saveCampaign(CreatePollFixtures.validCommand());
    })

    const updateCommand = new UpdatePollCommand(
        "1",
        "What is your favorite color ?",
        [{ id: "1", title: "Yellow" }, { id: "1", title: "Orange" }],
        tomorrow,
        twoDaysFromNow,
    )

    it('updates a poll successfully', async () => {
        await execute(updateCommand);

        const expectedPoll = Poll.create({
            id: "1",
            question: "What is your favorite color ?",
            options: [{ id: "1", title: "Yellow" }, { id: "1", title: "Orange" }],
            startDate: tomorrow,
            endDate: twoDaysFromNow,
        });

        const polls = await pollRepository.findAll();

        expect(polls.length).toBe(1);
        expect(polls[0]).toEqual(expectedPoll);
    });

    async function execute(command: UpdatePollCommand): Promise<Poll> {
        const commandHandler = new UpdatePollCommandHandler(pollRepository);
        return commandHandler.execute(command);
    }

    async function saveCampaign(command: CreatePollCommand): Promise<void> {
        const commandHandler = new CreatePollCommandHandler(pollRepository, new InMemoryIdGenerator());
        commandHandler.execute(command);
    }
});
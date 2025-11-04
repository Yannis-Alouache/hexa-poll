import { CreatePollCommand } from "../../../domain/ports/in/commands/create-poll.command";
import { CreatePollCommandHandler } from "./create-poll.command-handler";
import { InMemoryPollRepository } from "../../../infrastructure/adapters/repositories/poll/in-memory-poll-repository";
import { InMemoryIdGenerator } from "../../../infrastructure/adapters/id-generator/in-memory-id-generator";
import { StartDateAfterEndDateException, StartDateInThePastException } from "../../../domain/errors";
import { Poll } from "../../../domain/models/poll/poll";
import { CreatePollFixtures } from "../../../../tests/shared/create-poll-fixtures";
import { tomorrow, twoDaysFromNow } from "../../../../tests/shared/dates.fixture";


describe('Create A Poll', () => {
    let pollRepository: InMemoryPollRepository;
    let idGenerator: InMemoryIdGenerator;

    beforeEach(() => {
        pollRepository = new InMemoryPollRepository();
        idGenerator = new InMemoryIdGenerator();
    }) 

    it('creates a poll with mandatory fields', async () => {
        await execute(CreatePollFixtures.validCommand());

        const expectedPoll = Poll.create({
            id: "1",
            question: "What is your favorite color ?",
            options: [{ id: "1", title: "Red" }, { id: "1", title: "Blue" }],
            startDate: tomorrow,
            endDate: twoDaysFromNow,
        });

        const polls = await pollRepository.findAll();

        expect(polls.length).toBe(1);
        expect(polls[0]).toEqual(expectedPoll);
    });

    it('throws an error if the start date is after the end date', async () => {
        await expect(execute(CreatePollFixtures.startDateAfterEndDateCommand())).rejects.toThrow(StartDateAfterEndDateException);
    });

    it('throws an error if the start date is in the past', async () => {
        await expect(execute(CreatePollFixtures.startDateInThePastCommand())).rejects.toThrow(StartDateInThePastException);
    });

    async function execute(command: CreatePollCommand): Promise<Poll> {
        const commandHandler = new CreatePollCommandHandler(pollRepository, idGenerator);
        return commandHandler.execute(command);
    }
});
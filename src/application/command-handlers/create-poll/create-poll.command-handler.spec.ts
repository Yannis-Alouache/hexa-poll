import { CreatePollCommand } from "../../../domain/ports/in/commands/create-poll.command";
import { CreatePollCommandHandler } from "./create-poll.command-handler";
import { InMemoryPollRepository } from "../../../infrastructure/adapters/repositories/poll/in-memory-poll-repository";
import { InMemoryIdGenerator } from "../../../infrastructure/adapters/id-generator/in-memory-id-generator";
import { StartDateAfterEndDateError } from "../../../domain/errors/start-date-after-end-date.error";
import { StartDateInThePastError } from "../../../domain/errors/start-date-in-the-past.error";
import { Poll } from "../../../domain/models/poll/poll";


describe('Create A Poll', () => {
    let pollRepository: InMemoryPollRepository;
    let idGenerator: InMemoryIdGenerator;

    beforeEach(() => {
        pollRepository = new InMemoryPollRepository();
        idGenerator = new InMemoryIdGenerator();
    })

    async function execute(command: CreatePollCommand): Promise<string> {
        const commandHandler = new CreatePollCommandHandler(pollRepository, idGenerator);
        return commandHandler.execute(command);
    }

    const tommorow = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const twoDaysFromNow = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const validCommand = new CreatePollCommand(
        "What is your favorite color ?",
        [{ title: "Red" }, { title: "Blue" }],
        tommorow,
        twoDaysFromNow,
    );

    const startDateInThePastCommand = new CreatePollCommand(
        "What is your favorite color ?",
        [{ title: "Red" }, { title: "Blue" }],
        yesterday,
        tommorow,
    );

    const startDateAfterEndDateCommand = new CreatePollCommand(
        "What is your favorite color ?",
        [{ title: "Red" }, { title: "Blue" }],
        tommorow,
        yesterday,
    );


    it('creates a poll with mandatory fields', async () => {
        await execute(validCommand);

        const expectedPoll = Poll.create({
            id: "1",
            question: "What is your favorite color ?",
            options: [
                {
                    id: "1",
                    title: "Red"
                },
                {
                    id: "1",
                    title: "Blue"
                }
            ],
            startDate: tommorow,
            endDate: twoDaysFromNow,
        });

        const polls = await pollRepository.findAll();

        expect(polls.length).toBe(1);
        expect(polls[0]).toEqual(expectedPoll);
    });

    it('throws an error if the start date is after the end date', async () => {
        await expect(execute(startDateAfterEndDateCommand)).rejects.toThrow(StartDateAfterEndDateError);
    });

    it('throws an error if the start date is in the past', async () => {
        await expect(execute(startDateInThePastCommand)).rejects.toThrow(StartDateInThePastError);
    });
});
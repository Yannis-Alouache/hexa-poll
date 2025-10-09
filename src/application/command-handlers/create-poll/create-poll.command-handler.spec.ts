import { CreatePollCommand } from "../../../domain/ports/in/commands/create-poll.command";
import { CreatePollCommandHandler } from "./create-poll.command-handler";
import { InMemoryPollRepository } from "../../../infrastructure/adapters/repositories/poll/in-memory-poll-repository";
import { InMemoryIdGenerator } from "../../../infrastructure/adapters/id-generator/in-memory-id-generator";



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

    const validCommand = new CreatePollCommand(
        "What is your favorite color ?",
        [{ title: "Red" }, { title: "Blue" }],
        new Date("2025-10-01T12:00:00.000Z"),
        new Date("2025-10-31T12:00:00.000Z"),
    );

    const startDateInThePastCommand = new CreatePollCommand(
        "What is your favorite color ?",
        [{ title: "Red" }, { title: "Blue" }],
        new Date("2025-09-01T12:00:00.000Z"),
        new Date("2025-10-31T12:00:00.000Z"),
    );

    const startDateAfterEndDateCommand = new CreatePollCommand(
        "What is your favorite color ?",
        [{ title: "Red" }, { title: "Blue" }],
        new Date("2025-10-01T12:00:00.000Z"),
        new Date("2025-09-31T12:00:00.000Z"),
    );


    it('creates a poll with mandatory fields', async () => {
        await execute(validCommand);

        const expectedPoll = {
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
            startDate: new Date("2025-10-01T12:00:00.000Z"),
            endDate: new Date("2025-10-31T12:00:00.000Z"),
        }

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
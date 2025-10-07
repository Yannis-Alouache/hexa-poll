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

    const command = new CreatePollCommand(
        "What is your favorite color ?",
        [{ title: "Red" }, { title: "Blue" }]
    );


    it('creates a poll with mandatory fields', async () => {
        await execute(command);


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
            ]
        }

        const polls = await pollRepository.findAll();

        expect(polls.length).toBe(1);
        expect(polls[0]).toEqual(expectedPoll);
    });

});
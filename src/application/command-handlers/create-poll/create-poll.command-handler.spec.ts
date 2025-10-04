import { CreatePollCommand } from "src/domain/ports/in/commands/create-poll.command";
import { CreatePollCommandHandler } from "./create-poll.command-handler";
import { InMemoryPollRepository } from "src/infrastructure/repositories/poll/in-memory-poll-repository";



describe('Create A Poll', () => {
    let pollRepository: InMemoryPollRepository;

    beforeEach(() => {
        pollRepository = new InMemoryPollRepository();
    })

    async function execute(command: CreatePollCommand): Promise<string> {
        return new CreatePollCommandHandler().execute(command);
    }


    const command = new CreatePollCommand(
        "What is your favorite color ?",
        [{id: "123", title: "Red"}, {id: "124", title: "Blue"}]
    );


    it('creates a poll with mandatory fields', async () => {
        await execute(command);


        const expectedPoll = {
            id: "123",
            question: "What is your favorite color ?",
            options: [
                {
                    id: "123",
                    title: "Red"
                },
                {
                    id: "124",
                    title: "Blue"
                }
            ]
        }

        const polls = await pollRepository.findAll();

        expect(polls.length).toBe(1);
        expect(polls[0]).toEqual(expectedPoll);
    });

});
import { InMemoryPollRepository } from "../../../infrastructure/adapters/repositories/poll/in-memory-poll-repository";
import { DeletePollCommand } from "../../../domain/ports/in/commands/delete-poll.command";
import { DeletePollCommandHandler } from "./delete-poll.command-handler";
import { Poll } from "../../../domain/models/poll/poll";


describe('Delete A Poll', () => {
    let pollRepository: InMemoryPollRepository;

    beforeEach(() => {
        pollRepository = new InMemoryPollRepository();
    })

    async function execute(command: DeletePollCommand): Promise<void> {
        const commandHandler = new DeletePollCommandHandler(pollRepository);
        return commandHandler.execute(command);
    }

    it('delete a poll', async () => {
        pollRepository.save(Poll.create({
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
            startDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
            endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        }))

        const command = new DeletePollCommand("1");
        await execute(command);

        const polls = await pollRepository.findAll();
        expect(polls.length).toBe(0);
    });
});
import { Poll } from "src/domain/models/poll/poll";
import { PollRepository } from "src/domain/ports/out/repositories/poll-repository";

export class InMemoryPollRepository implements PollRepository {
    private database: Poll[] = [];

    async save(poll: Poll): Promise<void> {
        if (this.database.find(p => p.data.id === poll.data.id)) {
            const index = this.database.findIndex(p => p.data.id === poll.data.id);
            this.database[index] = poll;
        } else {
            this.database.push(poll);
        }
    }

    update(poll: Poll): Promise<Poll> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    findById(id: string): Promise<Poll> {
        throw new Error("Method not implemented.");
    }

    async findAll(): Promise<Poll[]> {
        return this.database;
    }
}
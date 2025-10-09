import { Poll } from "src/domain/models/poll/poll";
import { PollRepository } from "src/domain/ports/out/repositories/poll-repository";

export class InMemoryPollRepository implements PollRepository {
    private database: Poll[] = [];

    async save(poll: Poll): Promise<void> {
        this.database.push(poll);
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
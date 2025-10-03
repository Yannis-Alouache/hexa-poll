import { Poll } from "src/domain/models/poll";
import { PollRepository } from "src/domain/ports/out/repositories/poll-repository";

export class MongoPollRepository implements PollRepository {
    save(poll: Poll): Promise<string> {
        throw new Error("Method not implemented.");
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
    findAll(): Promise<Poll[]> {
        throw new Error("Method not implemented.");
    }
}
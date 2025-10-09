import { Poll } from "src/domain/models/poll/poll";

export interface PollRepository {
    save(poll: Poll): Promise<void>;
    update(poll: Poll): Promise<Poll>;
    delete(id: string): Promise<void>;
    findById(id: string): Promise<Poll>;
    findAll(): Promise<Poll[]>;
}
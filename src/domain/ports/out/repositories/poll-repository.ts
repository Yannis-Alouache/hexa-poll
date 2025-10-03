import { Poll } from "src/domain/models/poll";

export interface PollRepository {
    save(poll: Poll): Promise<string>;
    update(poll: Poll): Promise<Poll>;
    delete(id: string): Promise<void>;
    findById(id: string): Promise<Poll>;
    findAll(): Promise<Poll[]>;
}
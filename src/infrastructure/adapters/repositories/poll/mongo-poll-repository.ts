import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Collection, Model } from "mongoose";
import { Poll } from "src/domain/models/poll";
import { PollRepository } from "src/domain/ports/out/repositories/poll-repository";
import { MongoPoll } from "src/infrastructure/schemas/poll.schema";

@Injectable()
export class MongoPollRepository implements PollRepository {

    constructor(
        @InjectModel(MongoPoll.name)
        private readonly pollModel: Model<MongoPoll>
    ) {}

    async save(poll: Poll): Promise<void> {
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
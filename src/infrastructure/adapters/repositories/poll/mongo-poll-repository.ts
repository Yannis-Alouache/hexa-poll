import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Poll } from "../../../../domain/models/poll/poll";
import { PollRepository } from "../../../../domain/ports/out/repositories/poll-repository";
import { MongoPoll } from "../../../schemas/poll.schema";

@Injectable()
export class MongoPollRepository implements PollRepository {

    constructor(
        @InjectModel(MongoPoll.name)
        private readonly pollModel: Model<MongoPoll>
    ) {}

    async save(poll: Poll): Promise<void> {
        const test = new this.pollModel(poll.toPersistence());
        await test.save();
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
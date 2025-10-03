import { Query } from "@nestjs/cqrs";
import { PollEntity } from "src/infrastructure/persistence-models/poll-entity";

export class GetPollQuery extends Query<PollEntity> {
    constructor(public readonly id: string) {
        super();
    }
}

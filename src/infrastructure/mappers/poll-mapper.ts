import { Poll } from "src/domain/models/poll";
import { Mapper } from "./mapper";

export class PollMapper implements Mapper<Poll, Poll> {
    toDomain(entity: Poll): Poll {
        throw new Error("Method not implemented.");
    }

    toEntity(domain: Poll): Poll {
        throw new Error("Method not implemented.");
    }
}
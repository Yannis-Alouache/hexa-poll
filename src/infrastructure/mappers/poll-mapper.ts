import { Poll } from "../../domain/models/poll/poll";
import { MongoPoll } from "../schemas/poll.schema";

export class PollMapper {
    static toDomain(entity: MongoPoll): Poll {
        const poll = Poll.create({
            id: entity._id,
            question: entity.question,
            options: entity.options.map(option => ({
                id: option._id,
                title: option.title
            })),
            startDate: entity.startDate,
            endDate: entity.endDate,
        });

        return poll;
    }

    static toEntity(domain: Poll): MongoPoll {
        const data = domain.toPersistence();

        const mongoPoll = new MongoPoll();
        mongoPoll._id = data._id;
        mongoPoll.question = data.question;
        mongoPoll.options = data.options.map(option => ({
            _id: option.id,
            title: option.title
        }));
        mongoPoll.startDate = data.startDate;
        mongoPoll.endDate = data.endDate;

        return mongoPoll;
    }
}
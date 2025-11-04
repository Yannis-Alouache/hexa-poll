import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { MongooseModule } from "@nestjs/mongoose";
import { PollController } from "../controllers/poll.controller";
import { CreatePollCommandHandler } from "src/application/command-handlers/create-poll/create-poll.command-handler";
import { MongoPollRepository } from "src/infrastructure/adapters/repositories/poll/mongo-poll-repository";
import { MongoPoll, MongoPollSchema } from "src/infrastructure/schemas/poll.schema";
import { MongoIdGenerator } from "src/infrastructure/adapters/id-generator/mongo-id-generator";
import { DeletePollCommandHandler } from "src/application/command-handlers/delete-poll/delete-poll.command-handler";
import { UpdatePollCommandHandler } from "src/application/command-handlers/update-poll/update-poll.command-handler";

@Module({
    imports: [
        CqrsModule.forRoot(),
        MongooseModule.forRoot("mongodb://localhost:27017/hexa-poll"),
        MongooseModule.forFeature([{ name: MongoPoll.name, schema: MongoPollSchema }])
    ],
    controllers: [PollController],
    providers: [
        // COMMAND HANDLERS
        CreatePollCommandHandler,
        UpdatePollCommandHandler,
        DeletePollCommandHandler,


        // QUERY HANDLERS

        // REPOSITORIES
        {
            provide: 'PollRepository',
            useClass: MongoPollRepository
        },
    

        // 
        {
            provide: 'IdGenerator',
            useFactory: () => {
                return new MongoIdGenerator();
            }
        }
    ],
})
export class AppModule {}

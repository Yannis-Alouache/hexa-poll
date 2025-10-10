import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { MongooseModule } from "@nestjs/mongoose";
import { PollController } from "../controllers/poll.controller";
import { CreatePollCommandHandler } from "src/application/command-handlers/create-poll/create-poll.command-handler";
import { MongoPollRepository } from "src/infrastructure/adapters/repositories/poll/mongo-poll-repository";
import mongoose, { Model } from "mongoose";
import { MongoPollSchema } from "src/infrastructure/schemas/poll.schema";
import { MongoIdGenerator } from "src/infrastructure/adapters/id-generator/mongo-id-generator";

@Module({
    imports: [
        CqrsModule.forRoot(),
        MongooseModule.forRoot('mongodb://localhost:27017/polls')
    ],
    controllers: [PollController],
    providers: [
        // COMMAND HANDLERS
        CreatePollCommandHandler,


        // QUERY HANDLERS

        // REPOSITORIES
        {
            provide: 'PollRepository',
            useFactory: () => {
                return new MongoPollRepository(mongoose.model('PollModel', MongoPollSchema));
            }
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

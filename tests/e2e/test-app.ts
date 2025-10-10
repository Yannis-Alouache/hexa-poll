import { INestApplication } from "@nestjs/common";
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";
import { Test } from "@nestjs/testing";
import { CreatePollCommandHandler } from "../../src/application/command-handlers/create-poll/create-poll.command-handler";
import { PollController } from "../../src/infrastructure/api/controllers/poll.controller";
import { MongoPollRepository } from "../../src/infrastructure/adapters/repositories/poll/mongo-poll-repository";
import mongoose from "mongoose";
import { MongoPollSchema } from "../../src/infrastructure/schemas/poll.schema";
import { MongoIdGenerator } from "../../src/infrastructure/adapters/id-generator/mongo-id-generator";
import { CqrsModule } from "@nestjs/cqrs";


export class TestApp {
    private app: INestApplication;

    async setup() {
        const moduleRef = await Test.createTestingModule({
            imports: [
                CqrsModule.forRoot(),
            ],
            providers: [
                CreatePollCommandHandler,

                {
                    provide: 'PollRepository',
                    useFactory: () => {
                        return new MongoPollRepository(mongoose.model('PollModel', MongoPollSchema));
                    }
                },

                {
                    provide: 'IdGenerator',
                    useFactory: () => {
                        return new MongoIdGenerator();
                    }
                }
            ],
            controllers: [
                PollController,
            ],
        }).compile();

        this.app = moduleRef.createNestApplication<NestFastifyApplication>(
            new FastifyAdapter(),
        );
        await this.app.init();
    }

    async close() {
        await this.app.close();
    }

    get<T>(name: string) {
        return this.app.get<T>(name);
    }

    getHttpServer() {
        return this.app.getHttpServer();
    }
}
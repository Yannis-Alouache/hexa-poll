import { INestApplication, ValidationPipe } from "@nestjs/common";
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";
import { Test } from "@nestjs/testing";
import { CreatePollCommandHandler } from "../../src/application/command-handlers/create-poll/create-poll.command-handler";
import { PollController } from "../../src/infrastructure/api/controllers/poll.controller";
import { MongoPollRepository } from "../../src/infrastructure/adapters/repositories/poll/mongo-poll-repository";
import mongoose from "mongoose";
import { MongoPoll, MongoPollSchema } from "../../src/infrastructure/schemas/poll.schema";
import { MongoIdGenerator } from "../../src/infrastructure/adapters/id-generator/mongo-id-generator";
import { CqrsModule } from "@nestjs/cqrs";
import { MongooseModule } from "@nestjs/mongoose";


export class TestApp {
    private app: INestApplication;

    async setup() {
        const moduleRef = await Test.createTestingModule({
            imports: [
                CqrsModule.forRoot(),
                MongooseModule.forRoot("mongodb://localhost:27017/hexa-poll-e2e-tests"),
                MongooseModule.forFeature([{ name: MongoPoll.name, schema: MongoPollSchema }])
            ],
            controllers: [PollController],
            providers: [
                // COMMAND HANDLERS
                CreatePollCommandHandler,
        
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
        }).compile();

        this.app = moduleRef.createNestApplication();
        this.app.useGlobalPipes(new ValidationPipe());
        await this.app.init();
    }

    async close() {
        await this.app.close();
    }

    get<T>(name: string) {
        return this.app.get<T>(name);
    }

    getApp() {
        return this.app;
    }

    getHttpServer() {
        return this.app.getHttpServer();
    }
}
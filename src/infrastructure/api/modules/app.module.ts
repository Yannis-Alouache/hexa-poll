import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { MongooseModule } from "@nestjs/mongoose";
import { PollController } from "../controllers/poll.controller";

@Module({
    imports: [
        CqrsModule.forRoot(),
        MongooseModule.forRoot('mongodb://localhost/hexa-poll'),
    ],
    providers: [],
    controllers: [PollController],
})
export class AppModule {}

import { Body, Controller, Delete, Post } from "@nestjs/common";
import { CreatePollRequest } from "../dto/requests/create-poll.request";
import { CreatePollCommand } from "src/domain/ports/in/commands/create-poll.command";
import { CommandBus } from "@nestjs/cqrs";
import { DeletePollCommand } from "src/domain/ports/in/commands/delete-poll.command";
import { UpdatePollCommand } from "src/domain/ports/in/commands/update-poll.command";
import { UpdatePollResponse } from "../dto/responses/update-poll.response";
import { UpdatePollRequest } from "../dto/requests/update-poll.request";
import { DeletePollRequest } from "../dto/requests/delete-poll.request";


@Controller("api/polls")
export class PollController {
    constructor(
        private commandBus: CommandBus
    ) {}

    @Post()
    async createPoll(@Body() createPollRequest: CreatePollRequest): Promise<string> {
        return this.commandBus.execute(
            new CreatePollCommand(createPollRequest.question, createPollRequest.options)
        );
    }

    @Post("/update")
    async updatePoll(@Body() updatePollRequest: UpdatePollRequest): Promise<UpdatePollResponse> {
        return this.commandBus.execute(
            new UpdatePollCommand(updatePollRequest.question, updatePollRequest.options)
        );
    }

    @Delete()
    async deletePoll(@Body() deletePollRequest: DeletePollRequest): Promise<void> {
        return this.commandBus.execute(
            new DeletePollCommand(deletePollRequest.id)
        );
    }
}
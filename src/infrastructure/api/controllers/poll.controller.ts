import { Body, Controller, Delete, Post } from "@nestjs/common";
import { CreatePollRequest } from "../dtos/requests/create-poll.request";
import { CreatePollCommand } from "../../../domain/ports/in/commands/create-poll.command";
import { CommandBus } from "@nestjs/cqrs";
import { DeletePollCommand } from "../../../domain/ports/in/commands/delete-poll.command";
import { UpdatePollCommand } from "../../../domain/ports/in/commands/update-poll.command";
import { UpdatePollResponse } from "../dtos/responses/update-poll.response";
import { UpdatePollRequest } from "../dtos/requests/update-poll.request";
import { DeletePollRequest } from "../dtos/requests/delete-poll.request";
import { CreatePollResponse } from "../dtos/responses/create-poll.response";


@Controller("api/polls")
export class PollController {
    constructor(
        private commandBus: CommandBus
    ) {}

    @Post()
    async createPoll(@Body() createPollRequest: CreatePollRequest): Promise<CreatePollResponse> {
        return await this.commandBus.execute(
            new CreatePollCommand(createPollRequest.question, createPollRequest.options, createPollRequest.startDate, createPollRequest.endDate)
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
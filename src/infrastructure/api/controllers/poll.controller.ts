import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { CreatePollRequest } from '../dtos/requests/create-poll.request';
import { CreatePollCommand } from '../../../domain/ports/in/commands/create-poll.command';
import { CommandBus } from '@nestjs/cqrs';
import { DeletePollCommand } from '../../../domain/ports/in/commands/delete-poll.command';
import { UpdatePollCommand } from '../../../domain/ports/in/commands/update-poll.command';
import { UpdatePollResponse } from '../dtos/responses/update-poll.response';
import { UpdatePollRequest } from '../dtos/requests/update-poll.request';
import { CreatePollResponse } from '../dtos/responses/create-poll.response';
import { plainToInstance } from 'class-transformer';

@Controller('api/polls')
export class PollController {
  constructor(private commandBus: CommandBus) {}

  @Post()
  async createPoll(
    @Body() request: CreatePollRequest,
  ): Promise<CreatePollResponse> {
    const poll = await this.commandBus.execute(
      new CreatePollCommand(
        request.question,
        request.options,
        request.startDate,
        request.endDate,
      ),
    );

    return new CreatePollResponse(poll.data.id);
  }

  @Put(':id')
  async updatePoll(
    @Param('id') id: string,
    @Body() request: UpdatePollRequest,
  ): Promise<UpdatePollResponse> {
    const poll = await this.commandBus.execute(
      new UpdatePollCommand(
        id,
        request.question,
        request.options,
        request.startDate,
        request.endDate,
      ),
    );

    return plainToInstance(UpdatePollResponse, poll.data);
  }

  @Delete(':id')
  async deletePoll(@Param('id') id: string): Promise<void> {
    return this.commandBus.execute(new DeletePollCommand(id));
  }
}

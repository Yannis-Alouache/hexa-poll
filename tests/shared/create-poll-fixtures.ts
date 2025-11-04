import { CreatePollCommand } from "../../src/domain/ports/in/commands/create-poll.command";
import { tomorrow, twoDaysFromNow, yesterday } from "./dates.fixture";

export const CreatePollFixtures = {
    validCommand: () => new CreatePollCommand(
        "What is your favorite color ?",
        [{ title: "Red" }, { title: "Blue" }],
        tomorrow,
        twoDaysFromNow,
    ),

    startDateInThePastCommand: () => new CreatePollCommand(
        "What is your favorite color ?",
        [{ title: "Red" }, { title: "Blue" }],
        yesterday,
        tomorrow,
    ),

    startDateAfterEndDateCommand: () => new CreatePollCommand(
        "What is your favorite color ?",
        [{ title: "Red" }, { title: "Blue" }],
        tomorrow,
        yesterday,
    )
};
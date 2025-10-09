import { StartDateAfterEndDateError } from "../../../errors/start-date-after-end-date.error";
import { StartDateInThePastError } from "../../../errors/start-date-in-the-past.error";

interface PollDatesCreationProps {
    startDate: Date;
    endDate: Date;
}

export class PollDates {
    public readonly startDate: Date;
    public readonly endDate: Date;

    constructor(props: PollDatesCreationProps) {
        if (this.isStartDateAfterEndDate(props)) throw new StartDateAfterEndDateError();
        if (this.isStartDateInThePast(props)) throw new StartDateInThePastError();

        this.startDate = props.startDate;
        this.endDate = props.endDate;
    }

    private isStartDateAfterEndDate(props: PollDatesCreationProps) {
        return props.endDate.getTime() < props.startDate.getTime();
    }

    private isStartDateInThePast(props: PollDatesCreationProps) {
        return props.startDate.getTime() < new Date().getTime();
    }
}
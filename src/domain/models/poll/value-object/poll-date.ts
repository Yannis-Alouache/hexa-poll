import { StartDateAfterEndDateException, StartDateInThePastException } from "../../../errors";

interface PollDatesCreationProps {
    startDate: Date;
    endDate: Date;
}

export class PollDates {
    public readonly startDate: Date;
    public readonly endDate: Date;

    constructor(props: PollDatesCreationProps) {
        if (this.isStartDateAfterEndDate(props)) throw new StartDateAfterEndDateException();
        if (this.isStartDateInThePast(props)) throw new StartDateInThePastException();

        this.startDate = props.startDate;
        this.endDate = props.endDate;
    }

    private isStartDateAfterEndDate(props: PollDatesCreationProps) {
        return new Date(props.endDate).getTime() < new Date(props.startDate).getTime();
    }

    private isStartDateInThePast(props: PollDatesCreationProps) {
        return new Date(props.startDate).getTime() < new Date().getTime();
    }
}
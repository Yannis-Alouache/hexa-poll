import { StartDateAfterEndDateException, StartDateInThePastException } from "../../../errors";

interface PollDatesCreationProps {
    startDate: Date;
    endDate: Date;
}

export class PollDates {
    private startDate: Date;
    private endDate: Date;

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
        const startDate = new Date(props.startDate).getTime();
        const now = new Date().getTime();
        console.log('DEBUG: Start date timestamp:', startDate);
        console.log('DEBUG: Current timestamp:', now);
        console.log('DEBUG: Start date value:', new Date(props.startDate));
        console.log('DEBUG: Current date value:', new Date());
        console.log('DEBUG: Is start date in past?', startDate < now);
        return startDate < now;
    }

    toPersistence() {
        return {
            startDate: this.startDate,
            endDate: this.endDate,
        }
    }

    get data() {
        return {
            startDate: this.startDate,
            endDate: this.endDate,
        }
    }
}
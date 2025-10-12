import { Option, OptionCreationProps } from "./value-object/option";
import { PollDates } from "./value-object/poll-date";


// {
//     "id": "123",
//     "question": "What is your favorite color ?",
//     "options": [
//         {
//             "id": "123",
//             "name": "Red"
//         },
//         {
//             "id": "124",
//             "name": "Blue"
//         }
//     ],
//     "startDate": "2025-10-01T12:00:00.000Z",
//     "endDate": "2025-10-31T12:00:00.000Z",
// }


export interface PollCreationProps {
    id: string;
    question: string;
    options: OptionCreationProps[];
    startDate: Date;
    endDate: Date;
}
export class Poll {
    private id: string;
    private question: string;
    private options: Option[];
    private dates: PollDates;

    private constructor(props: PollCreationProps) {
        this.id = props.id;
        this.question = props.question;
        this.options = props.options.map(option => new Option(option));
        this.dates = new PollDates({ startDate: props.startDate, endDate: props.endDate });
    }

    static create(props: PollCreationProps): Poll {
        return new Poll(props);
    }

    public toPersistence() {
        const dates = this.dates.toPersistence();

        return {
            _id: this.id,
            question: this.question,
            options: this.options.map(option => option.toPersistence()),
            startDate: dates.startDate,
            endDate: dates.endDate,
        }
    }
}
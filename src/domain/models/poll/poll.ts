import { Option, OptionCreationProps } from "../option";


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
    private startDate: Date;
    private endDate: Date;

    private constructor(props: PollCreationProps) {
        this.id = props.id;
        this.question = props.question;
        this.options = props.options;
        this.startDate = props.startDate;
        this.endDate = props.endDate;
    }

    static create(props: PollCreationProps): Poll {
        return new Poll(props);
    }
}
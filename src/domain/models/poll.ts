import { Option, OptionCreationProps } from "./option";


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
//     ]
// }


export interface PollCreationProps {
    id: string;
    question: string;
    options: OptionCreationProps[];
}
export class Poll {
    private id: string;
    private question: string;
    private options: Option[];

    private constructor(props: PollCreationProps) {
        this.id = props.id;
        this.question = props.question;
        this.options = props.options;
    }

    static create(props: PollCreationProps): Poll {
        return new Poll(props);
    }
}
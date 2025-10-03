// {
//     "optionId": "123"
// }

export interface VoteCreationProps {
    optionId: string;
}

export class Vote {
    optionId: string;

    private constructor(props: VoteCreationProps) {
        this.optionId = props.optionId;
    }

    static create(props: VoteCreationProps): Vote {
        return new Vote(props);
    }
}
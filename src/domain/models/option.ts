// {
//     "id": "123",
//     "title": "Red"
// }

export interface OptionCreationProps {
    id: string;
    title: string;
}

export class Option {
    id: string;
    title: string;

    private constructor(props: OptionCreationProps) {
        this.id = props.id;
        this.title = props.title;
    }

    static create(props: OptionCreationProps): Option {
        return new Option(props);
    }
}
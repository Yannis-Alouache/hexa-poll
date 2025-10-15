// {
//     "id": "123",
//     "title": "Red"
// }

export interface OptionCreationProps {
    id: string;
    title: string;
}

export class Option {
    public readonly id: string;
    public readonly title: string;

    constructor(props: OptionCreationProps) {
        this.id = props.id;
        this.title = props.title;
    }

    toPersistence() {
        return {
            id: this.id,
            title: this.title,
        }
    }

    get data() {
        return {
            id: this.id,
            title: this.title,
        }
    }
}
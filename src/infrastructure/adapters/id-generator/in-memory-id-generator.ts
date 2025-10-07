import { IdGenerator } from "../../../domain/ports/out/id-generator";

export class InMemoryIdGenerator implements IdGenerator {
    generate(): string {
        return '1';
    }
}
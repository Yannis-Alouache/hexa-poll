import {  IdGenerator } from "../../../domain/ports/out/id-generator";

export class MongoIdGenerator implements IdGenerator {
    generate(): string {
        throw new Error("Method not implemented.");
    }
}
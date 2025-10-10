import mongoose from "mongoose";
import {  IdGenerator } from "../../../domain/ports/out/id-generator";

export class MongoIdGenerator implements IdGenerator {
    generate(): string{
        return new mongoose.Types.ObjectId().toHexString();
    }
}
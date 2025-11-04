import request from "supertest";
import { TestApp } from "./test-app";
import { basicPollSeed } from "./seed/poll.seed";
import { PollRepository } from "../../src/domain/ports/out/repositories/poll-repository";

describe('Update A Poll', () => {
    let app: TestApp;

    beforeAll(async () => {
        app = new TestApp();
        await app.setup();
        await app.loadFixture([basicPollSeed])
    });

    afterAll(async () => {
        await app.clearDatabase();
        await app.close();
    });
    
    it('updates a poll successfully', async () => {
        const repository = app.get<PollRepository>('PollRepository');
        console.log(await repository.findById(basicPollSeed.id));

        console.log(await repository.findById(basicPollSeed.id));

        const result = await request(app.getHttpServer()).put(`/api/polls/${basicPollSeed.id}`).send({
            question: "What is your favorite color ?",
            options: [{ id: "1", title: "Yellow" }, { id: "1", title: "Orange" }],
            startDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
            endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        });

        expect(result.status).toBe(201);
        expect(result.body.id).toEqual(expect.any(String));
    });
});
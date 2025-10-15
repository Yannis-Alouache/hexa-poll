import { TestApp } from "./test-app";
import request from "supertest";
import { basicPollSeed } from "./seed/poll.seed";

describe('Delete A Poll', () => {
    let app: TestApp;

    beforeAll(async () => {
        app = new TestApp();
        await app.setup();
        await app.loadFixture(basicPollSeed);
    });

    afterAll(async () => {
        await app.clearDatabase();
        await app.close();
    });

    it('deletes a poll successfully', async () => {
        const result = await request(app.getHttpServer())
            .delete(`/api/polls/${basicPollSeed.id}`);

        expect(result.status).toBe(200);
    });

    it('don\'t throw an error when trying to delete a non-existent poll', async () => {
        const result = await request(app.getHttpServer())
            .delete(`/api/polls/non-existent-poll-id`);

        expect(result.status).toBe(200);
    });
});  
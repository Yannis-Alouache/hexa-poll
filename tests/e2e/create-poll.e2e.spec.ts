import { TestApp } from "./test-app";
import request from "supertest";

describe('Create A Poll', () => {
    let app: TestApp;

    beforeAll(async () => {
        app = new TestApp();
        await app.setup();
    });

    afterAll(async () => {
        await app.close();
    });

    it('creates a poll with mandatory fields', async () => {
        const result = await request(app.getHttpServer()).post('/api/polls').send({
            question: "What is your favorite color ?",
            options: [{ title: "Red" }, { title: "Blue" }],
            startDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
            endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        });

        expect(result.status).toBe(201);
        expect(result.body.id).toEqual(expect.any(String));
    });
}); 
import { INestApplication } from "@nestjs/common";
import { TestApp } from "./test-app";
import { Test } from "@nestjs/testing";

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
        const result = app.getHttpServer().post('/api/polls').send({
            question: "What is your favorite color ?",
            options: [{ title: "Red" }, { title: "Blue" }],
            startDate: "2023-01-01T00:00:00.000Z",
            endDate: "2023-01-02T00:00:00.000Z",
        });

        expect(result.status).toBe(201);
        expect(result.body).toEqual(expect.any(String));
    });

    it('throws validation errors', async () => {
        const result = app.getHttpServer().post('/api/polls').send({});

        expect(result.status).toBe(400);
        expect(result.body).toEqual(expect.any(Object));
    });
});
import { CreatePollFixtures } from '../shared/create-poll-fixtures';
import { TestApp } from './test-app';
import request from 'supertest';

describe('Create A Poll', () => {
  let app: TestApp;

  beforeAll(async () => {
    app = new TestApp();
    await app.setup();
  });

  afterAll(async () => {
    await app.clearDatabase();
    await app.close();
  });

  it('creates a poll with mandatory fields', async () => {
    const result = await request(app.getHttpServer())
      .post('/api/polls')
      .send(CreatePollFixtures.validCommand());

    expect(result.status).toBe(201);
    expect(result.body.id).toEqual(expect.any(String));
  });
});

import request from 'supertest';
import createApplication from '../../app';

const app = createApplication();

describe('GET /', () => {
  it('returns a hello message', async () => {
    const response = await request(app).get('/');
    expect(response.headers['x-powered-by']).toBeUndefined();
    expect(response.statusCode).toEqual(200);
    expect(response.headers['content-type']).toEqual(
      'application/json; charset=utf-8'
    );
    expect(response.body.msg).toEqual('Hello');
  });
});

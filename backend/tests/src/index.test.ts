import request from "supertest";
import app from '../../src/index';

describe('server responding', () => {
  it('GET --> status 200', () => {
   return request(app)
   .get('/')
   .expect(200);
  });
});

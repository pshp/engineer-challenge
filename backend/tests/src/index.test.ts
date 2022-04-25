import request from "supertest";
import app from "../../src/index";
import "jest";
import "expect-more-jest";

describe("server responding", () => {
  it("GET --> status 200", () => {
    return request(app).get("/").expect(200);
  });
});

describe("Requests to server correctly processed", () => {
  it("GET /policies --> returns array of policies", async () => {
    const customer = {
      id: expect.any(String),
      firstName: expect.any(String),
      lastName: expect.any(String),
      dateOfBirth: expect.toBeIso8601(),
    };

    const policy = {
      id: expect.any(String),
      provider: expect.any(String),
      insuranceType: expect.any(String),
      status: expect.any(String),
      startDate: expect.toBeIso8601(),
      endDate: expect.toBeNullableOf(expect.toBeIso8601()),
      customer: customer,
    };

    const policies = await request(app).get("/policies").send();
    expect(policies.statusCode).toEqual(200);
    expect(policies.body).toEqual(
      expect.arrayContaining([expect.objectContaining(policy)])
    );
  }, 10000);
});

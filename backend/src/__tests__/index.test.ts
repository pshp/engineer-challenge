import request from "supertest";
import app from "../index";
import "jest";
import "expect-more-jest";

interface Customer {
  id: String;
  firstName: String;
  lastName: String;
  dateOfBirth: String;
}

interface Policy {
  id: String;
  provider: String;
  insuranceType: String;
  status: String;
  startDate: String;
  endDate?: String;
  customer: Customer;
}

describe("server responding", () => {
  it("GET --> status 200", () => {
    return request(app).get("/").expect(200);
  });
});

describe("Requests to server correctly processed", () => {
  // GET all policies once before tests
  let res: any;
  let allPolicies: Policy[] = [];
  beforeAll(async () => {
    res = await request(app).get("/policies").send();
    allPolicies = res.body;
  }, 10000);

  it("GET /policies --> returns array of policies with correct data types", async () => {
    // non-typescipt data type check
    const customerCheck = {
      id: expect.any(String),
      firstName: expect.any(String),
      lastName: expect.any(String),
      dateOfBirth: expect.toBeIso8601(),
    };
    const policyCheck = {
      id: expect.any(String),
      provider: expect.any(String),
      insuranceType: expect.any(String),
      status: expect.any(String),
      startDate: expect.toBeIso8601(),
      endDate: expect.toBeNullableOf(expect.toBeIso8601()),
      customer: customerCheck,
    };

    expect(res.statusCode).toEqual(200);
    expect(allPolicies).toEqual(
      expect.arrayContaining([expect.objectContaining(policyCheck)])
    );
  });

  it("GET /policies --> Insurance types: `LIABILITY`, `HOUSEHOLD`, `HEALTH`", async () => {
    allPolicies.forEach((policy) => {
      expect(["LIABILITY", "HOUSEHOLD", "HEALTH"]).toContain(
        policy.insuranceType
      );
    });
  });

  it("GET /policies --> status are only `ACTIVE` or `PENDING`", async () => {
    allPolicies.forEach((policy) => {
      expect(["ACTIVE", "PENDING"]).toContain(policy.status);
    });
  });

  it("GET /policies?search=BARMER --> Check search functionality is working", async () => {
    const singlePolicy = await request(app)
      .get("/policies?search=BARMER")
      .send();
    expect(singlePolicy.body).toEqual(
      expect.arrayContaining([expect.objectContaining({ provider: "BARMER" })])
    );
  });
});

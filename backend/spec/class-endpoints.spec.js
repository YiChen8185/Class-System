import request from "supertest";
import app from "../src/app.js";

describe("Class Endpoints", () => {
  let req;
  beforeEach(() => {
    req = request.agent(app);
  });

  it("GET /api/classes returns 200 with current users classes", async () => {
    await req.post("/api/login").send({ username: "user123" });
    let response = await req
      .post("/api/classes")
      .send({ name: "test-class-123" });

    await req.post("/api/login").send({ username: "user456" });
    response = await req.post("/api/classes").send({ name: "test-class-456" });

    response = await req.get("/api/classes");
    expect(response.statusCode).toBe(200);
    expect(response.body.classes[0]).toEqual(
      jasmine.objectContaining({ name: "test-class-456" })
    );
  });

  it("GET /api/classes returns 401 when user is not logged in", async () => {
    const response = await req.get("/api/classes");
    expect(response.statusCode).toBe(401);
  });

  it("POST /api/classes returns 201 when a class is created for current user", async () => {
    await req.post("/api/login").send({ username: "user123" });
    const response = await req
      .post("/api/classes")
      .send({ name: "test-class" });
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual(
      jasmine.objectContaining({ name: "test-class" })
    );
  });

  it("POST /api/classes returns 400 when name field is missing", async () => {
    await req.post("/api/login").send({ username: "user123" });

    const response = await req
      .post("/api/classes")
      .send({ notAProperty: "foobar" });
    expect(response.statusCode).toBe(400);
  });

  it("POST /api/classes returns 401 when user is not logged in", async () => {
    const response = await req
      .post("/api/classes")
      .send({ notAProperty: "foobar" });
    expect(response.statusCode).toBe(401);
  });
});

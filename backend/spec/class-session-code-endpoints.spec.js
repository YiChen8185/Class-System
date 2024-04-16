import request from "supertest";
import app from "../src/app.js";

describe("Class Session Code endpoints", () => {
  let req;
  beforeEach(() => {
    req = request.agent(app);
  });

  it("POST /api/class/:classId/session-code returns 201 with a new session code", async () => {
    await req.post("/api/login").send({ username: "user123" });

    let response = await req.post("/api/classes").send({ name: "test-class" });

    response = await req.post(`/api/class/${response.body.id}/session-code`);
    expect(response.statusCode).toBe(201);
    expect(response.body.id).not.toBe(null);
  });

  it("POST /api/class/:classId/session-code returns 404 when classId doesnt exist", async () => {
    await req.post("/api/login").send({ username: "user123" });

    const response = await req.post(`/api/class/fakeClassId/session-code`);
    expect(response.statusCode).toBe(404);
    expect(response.body.id).not.toBe(null);
  });

  it("POST /api/class/:classId/session-code returns 401 when there is no current user", async () => {
    const response = await req.post("/api/class/fakeClassId/session-code");

    expect(response.statusCode).toBe(401);
  });
});

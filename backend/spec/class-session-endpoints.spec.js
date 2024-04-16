import request from "supertest";
import app from "../src/app.js";

describe("Class Session endpoints", () => {
  let req;
  beforeEach(() => {
    req = request.agent(app);
  });

  it("POST /api/class-session/:session-code/question returns 201 when a new question is created", async () => {
    // login, create a new class, and create a new session
    let response = await req.post("/api/login").send({ username: "user123" });
    response = await req.post("/api/classes").send({ name: "test-class" });

    response = await req.post(`/api/class/${response.body.id}/session-code`);
    expect(response.statusCode).toBe(201);
    expect(response.body.id).not.toBe(null);

    // logout and create a question as a logged out user
    await req.get("/api/logout");

    response = await req
      .post(`/api/class-session/${response.body.id}/question`)
      .send({ question: "why is the sky blue", name: "anon" });
    expect(response.statusCode).toBe(201);
    expect(response.body.question).toEqual("why is the sky blue");
  });

  it("PUT /api/class-session/:session-code/question/:question-id/upvote returns 201 when a question is upvoted", async () => {
    // login, create a new class, and create a new session
    let response = await req.post("/api/login").send({ username: "user123" });
    response = await req.post("/api/classes").send({ name: "test-class" });

    response = await req.post(`/api/class/${response.body.id}/session-code`);
    expect(response.statusCode).toBe(201);
    expect(response.body.id).not.toBe(null);
    const sessionCode = response.body.id;

    // logout and create a question as a logged out user
    await req.get("/api/logout");

    response = await req
      .post(`/api/class-session/${sessionCode}/question`)
      .send({ question: "why is the sky blue", name: "anon" });
    expect(response.statusCode).toBe(201);
    expect(response.body.question).toEqual("why is the sky blue");
    const questionId = response.body.id;

    response = await req.put(
      `/api/class-session/${sessionCode}/question/${questionId}/upvote`
    );
    expect(response.statusCode).toBe(201);
    expect(response.body.upvotes).toEqual(1);
  });

  it("POST /api/class-session/:session-code/question returns 404 when no class session found", async () => {
    const response = await req
      .post(`/api/class-session/fakeSessionCode/question`)
      .send({ question: "why is the sky blue", name: "anon" });
    expect(response.statusCode).toBe(404);
  });

  it("GET /api/class-session/:session-code returns 200 with questions from class session", async () => {
    // login, create a new class, and create a new session
    let response = await req.post("/api/login").send({ username: "user123" });
    response = await req.post("/api/classes").send({ name: "test-class" });

    response = await req.post(`/api/class/${response.body.id}/session-code`);
    const newSessionCode = response.body.id;
    expect(response.statusCode).toBe(201);
    expect(newSessionCode).not.toBe(null);

    // logout and create a question as a logged out user
    await req.get("/api/logout");

    response = await req.get(`/api/class-session/${newSessionCode}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.questions).toEqual([]);
  });

  it("GET /api/class-session/:session-code returns 404 when no class session found", async () => {
    const response = await req.get("/api/class-session/fakeSessionCode");
    expect(response.statusCode).toBe(404);
  });
});

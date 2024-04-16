import request from "supertest";
import app from "../src/app.js";

describe("login endpoints", () => {
  let req;
  beforeEach(() => {
    req = request.agent(app);
  });

  it("GET /api/user returns 400 when request is missing username field", async () => {
    const response = await req.post("/api/login").send("");
    expect(response.statusCode).toBe(400);
  });

  it("GET /api/user returns 401 when there is no session", async () => {
    const response = await req.get("/api/user");
    expect(response.statusCode).toBe(401);
  });

  it("GET /api/user returns 200 when user session is created", async () => {
    let response = await req.post("/api/login").send({ username: "user123" });
    expect(response.statusCode).toBe(200);

    response = await req.get("/api/user");
    expect(response.statusCode).toBe(200);
    expect(response.body.username).toEqual("user123");
  });

  it("GET /api/user returns 401 after user logs out", async () => {
    let response = await req.post("/api/login").send({ username: "user123" });
    expect(response.statusCode).toBe(200);

    response = await req.get("/api/user");
    expect(response.statusCode).toBe(200);

    response = await req.get("/api/logout");
    expect(response.statusCode).toBe(200);

    response = await req.get("/api/user");
    expect(response.statusCode).toBe(401);
  });
});

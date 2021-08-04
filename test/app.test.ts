import request from "supertest";
import app from "../src/app";

describe("GET api/task/debug", () => {
  test("should respond with 'Hello World!'", async () => {
    const response = await request(app).get("/api/task/debug").send();
    expect(response.text).toBe("Hello world!");
  });
});

import request from "supertest";
import app from "../src/app";
import Joi from "joi";
import prisma from "../src/prisma/prisma";

const TASK_TEST_NAME = "APPLICATION-TEST";

afterAll(async () => {
  await prisma.finishedTask.deleteMany({ where: { name: TASK_TEST_NAME } });
  await prisma.trackedTask.deleteMany();
  prisma.$disconnect();
});

describe("undefined route", () => {
  test("should respond with error and status code 404", async () => {
    const response = await request(app).get("/api/not_existing_route").send();
    expect(response.status).toBe(404);
    expect(response.body.error);
  });
});

describe("POST api/task/create", () => {
  test("should respond with error and status code 400", async () => {
    const response = await request(app).post("/api/task/create").send();
    expect(response.status).toBe(400);
    expect(response.body.error);
  });

  test("should respond with created task and status code 200", async () => {
    const response = await request(app).post("/api/task/create").send({
      name: TASK_TEST_NAME,
    });
    expect(response.status).toBe(200);
  });
});

describe("GET api/task/fetch/finished", () => {
  test("should respond with finished tasks and status code 200", async () => {
    const response = await request(app).get("/api/task/fetch/finished").send();
    expect(response.status).toBe(200);
  });
});

describe("GET api/task/fetch/tracked", () => {
  test("should respond with [tracked task/message] and status code 200", async () => {
    const response = await request(app).get("/api/task/fetch/tracked").send();
    expect(response.status).toBe(200);
  });
});

describe("GET api/task/stop", () => {
  test("should respond with [saved task/message] and status code 200", async () => {
    const response = await request(app).get("/api/task/stop").send();
    expect(response.status).toBe(200);
  });
});

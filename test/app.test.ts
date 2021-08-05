import request from "supertest";
import app from "../src/app";
import Joi from "joi";
import prisma from "../src/prisma/prisma";

const TASK_TEST_NAME = "APPLICATION-TEST";

/* Some of the tests have variants with 2 requests in a row
because body of their response might change after first request */

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
    const validation = createSchema.validate(response.body);
    expect(validation.error).toBe(undefined);
  });

  test("should respond with created task and status code 200 (2 requests in a row)", async () => {
    await request(app).post("/api/task/create").send({
      name: TASK_TEST_NAME,
    });
    const response2 = await request(app).post("/api/task/create").send({
      name: TASK_TEST_NAME,
    });

    expect(response2.status).toBe(200);
    const validation = createSchema.validate(response2.body);
    expect(validation.error).toBe(undefined);
  });
});

describe("GET api/task/fetch/finished", () => {
  test("should respond with finished tasks and status code 200", async () => {
    const response = await request(app).get("/api/task/finished").send();
    expect(response.status).toBe(200);
    const validation = finishedSchema.validate(response.body);
    expect(validation.error).toBe(undefined);
  });
});

describe("GET api/task/fetch/tracked", () => {
  test("should respond with [tracked task/message] and status code 200", async () => {
    const response = await request(app).get("/api/task/tracked").send();
    expect(response.status).toBe(200);
    const validation = trackedSchema.validate(response.body);
    expect(validation.error).toBe(undefined);
  });
});

describe("GET api/task/stop", () => {
  test("should respond with [saved task/message] and status code 200", async () => {
    const response = await request(app).get("/api/task/stop").send();
    expect(response.status).toBe(200);
    const validation = stopSchema.validate(response.body);
    expect(validation.error).toBe(undefined);
  });

  test("should respond with [saved task/message] and status code 200 (2 requests in a row)", async () => {
    await request(app).get("/api/task/stop").send();
    const response2 = await request(app).get("/api/task/stop").send();

    expect(response2.status).toBe(200);
    const validation = stopSchema.validate(response2.body);
    expect(validation.error).toBe(undefined);
  });
});

/* Response schemas */

const finishedTaskSchema = Joi.object({
  id: Joi.number().positive().required(),
  name: Joi.string().required(),
  time_start: Joi.date().required(),
  time_finish: Joi.date().required(),
}).required();

const trackedTaskSchema = Joi.object({
  id: Joi.number().optional(),
  name: Joi.string().required(),
  time_start: Joi.date().required(),
}).required();

const messageSchema = Joi.object({
  message: Joi.string().required(),
}).required();

const emptyTaskSchema = Joi.object({}).required();

const finishedSchema = Joi.array().items(finishedTaskSchema).required();

const createSchema = Joi.object({
  previous: [finishedTaskSchema, emptyTaskSchema],
  new: trackedTaskSchema,
}).required();

const stopSchema = Joi.alternatives().try(finishedTaskSchema, messageSchema);

const trackedSchema = Joi.alternatives().try(trackedTaskSchema, messageSchema);

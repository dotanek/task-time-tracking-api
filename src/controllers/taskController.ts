import { Request, Response, NextFunction } from "express";
import ResponseError from "../utilities/responseError";

import validator from "../validators/taskValidator";
import prisma from "../prisma/prisma";

/** Creates a new task and starts tracking it, stops the tracking previous one. */
const create = async (req: Request, res: Response, next: NextFunction) => {
  const validation = validator.createValidate(req.body);
  if (validation.error) {
    return next(new ResponseError(validation.error.message, 400));
  }

  /* If a task was already being tracked be will return it as previous. */
  const response = { previous: {}, new: {} };

  try {
    /* Checking if any task was already being tracked. */
    const resCheckTracked = await prisma.trackedTask.findFirst();

    /* If it's defined then we need to save it to finished and remove from tracked. */
    if (resCheckTracked) {
      const finishedTask = {
        name: resCheckTracked.name,
        time_start: resCheckTracked.time_start,
        time_finish: new Date(Date.now()).toISOString(),
      };
      const [resDelTracked, resCreFinished] = await prisma.$transaction([
        prisma.trackedTask.delete({ where: { id: 0 } }),
        prisma.finishedTask.create({ data: finishedTask }),
      ]);

      response.previous = resCreFinished;
    }

    /* Creating a new tracked task. */
    const trackedTask = {
      name: validation.value.name,
      time_start: new Date(Date.now()).toISOString(),
    };

    const result2 = await prisma.trackedTask.create({ data: trackedTask });

    response.new = result2;
  } catch (err) {
    console.log(err);
    return next(new ResponseError("Database error.", 500));
  }

  res.json(response);
};

/** Stops tracking currently tracked task. */
const stop = async (req: Request, res: Response, next: NextFunction) => {
  try {
    /* Checking if any task was already being tracked. */
    const resCheckTracked = await prisma.trackedTask.findFirst();

    /* If it's not defined there is nothing to return. */
    if (!resCheckTracked) {
      return res.json({ message: "No task is being tracked." });
    }

    /* If it's defined then we need to save it to finished and remove from tracked. */
    const finishedTask = {
      name: resCheckTracked.name,
      time_start: resCheckTracked.time_start,
      time_finish: new Date(Date.now()).toISOString(),
    };

    const [resDelTracked, resCreFinished] = await prisma.$transaction([
      prisma.trackedTask.delete({ where: { id: 0 } }),
      prisma.finishedTask.create({ data: finishedTask }),
    ]);

    res.json(resCreFinished);
  } catch (err) {
    console.log(err);
    return next(new ResponseError("Database error.", 500));
  }
};

/** Fetches all finished tasks. */
const fetchFinished = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = await prisma.finishedTask.findMany();
  res.json(result);
};

/** Fetches currently tracked task. */
const fetchTracked = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = await prisma.trackedTask.findFirst();

  /* If the result is null then no task is currently being tracked. */
  if (!result) {
    return res.status(200).json({ message: "No task is being tracked." });
  }

  res.json(result);
};

export default {
  create,
  stop,
  fetchFinished,
  fetchTracked,
};

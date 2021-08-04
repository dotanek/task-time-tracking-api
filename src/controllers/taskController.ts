import { Request, Response, NextFunction } from "express";
import ResponseError from "../utilities/responseError";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

/* For debug purposes only, make sure to remove this. */
const debug = async (req: Request, res: Response, next: NextFunction) => {
  res.send("Hello world!");
};

/** Creates a new task and starts tracking it, stops the tracking previous one. */
const create = async (req: Request, res: Response, next: NextFunction) => {};

/** Stops tracking currently tracked task. */
const stop = async (req: Request, res: Response, next: NextFunction) => {};

/** Fetches all finished tasks. */
const fetchFinished = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

/** Fetches currently tracked task. */
const fetchTracked = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

export default {
  debug,
  create,
  stop,
  fetchFinished,
  fetchTracked,
};

import { Router } from "express";
import controller from "../controllers/taskController";

const router = Router();

/* api/task/[route] */
router.post("/create", controller.create);
router.get("/stop", controller.stop);
router.get("/tracked", controller.fetchTracked);
router.get("/finished", controller.fetchFinished);

export default router;

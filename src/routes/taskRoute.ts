import { Router } from "express";
import controller from "../controllers/taskController";

const router = Router();

router.get("/debug", controller.debug);
router.post("/create", controller.create);
router.get("/stop", controller.stop);
router.get("/fetch/tracked", controller.fetchTracked);
router.get("/fetch/finished", controller.fetchFinished);

export default router;

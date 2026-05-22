import Express from "express";

import {
    getEvents,
    createEvents,
    showEvents,
    updateEvents,
    deleteEvents
} from "../controllers/eventController.js";

const router = Express.Router();

router.get("/", getEvents);
router.post("/", createEvents);
router.get("/:id", showEvents);
router.put("/:id", updateEvents);
router.delete("/:id", deleteEvents);

export default router;
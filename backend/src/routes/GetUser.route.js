import express from "express";

import { verifyToken } from "../middlewares/verifyToken.js";
import { MarkDone, MarkBookMark, getUser } from "../controllers/GetUser.controller.js";

const router = express.Router();

router.post("/MarkDone/:id", verifyToken,MarkDone )
router.post("/MarkBookMark/:id", verifyToken, MarkBookMark)
router.get("/getUser", verifyToken,getUser )



export default router;



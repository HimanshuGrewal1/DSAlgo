import express from "express";

import { verifyToken } from "../middlewares/verifyToken.js";
import { GETQUES,GetCat} from "../controllers/GetQues.controller.js";

const router = express.Router();

router.get("/",GETQUES )
router.get("/GetCat",GetCat)


export default router;



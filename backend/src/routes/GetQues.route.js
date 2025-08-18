import express from "express";

import { verifyToken } from "../middlewares/verifyToken.js";
import { GETQUES,GetCat, GetQuesByCat} from "../controllers/GetQues.controller.js";

const router = express.Router();

router.get("/",GETQUES )
router.get("/GetCat",GetCat)
router.get("/GetQuesByCat/:id", GetQuesByCat);


export default router;



import express from "express";
import * as cakeControlers from "../controlers/cake.js"
import { auth, authAdmin } from "../middleWares/auth.js";
const router = express.Router();

router.get("/",auth,cakeControlers.getAllCakes )

router.get("/:id",auth,cakeControlers.getCakeById  )

router.delete("/:id",auth, cakeControlers.deleteCakeById)

router.post("/",auth,cakeControlers.postCake )

router.put("/:id",cakeControlers.putCakeById)

export default router;
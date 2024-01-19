import express from "express";
import * as cakeControlers from "../controlers/cake.js"
const router = express.Router();

router.get("/",cakeControlers.getAllCakes )




router.get("/:id",cakeControlers.getCakeById  )

router.delete("/:id", cakeControlers.deleteCakeById)

router.post("/",cakeControlers.postCake )

router.put("/:id",cakeControlers.putCakeById)

export default router;
import express from "express";
const router = express.Router();
import { postadditems } from "../Controllers/items.controller.js";
import { getdatabase } from "../Controllers/items.controller.js";

router.post("/additems", postadditems);
router.get("/database", getdatabase);

export default router;

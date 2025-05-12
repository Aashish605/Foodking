import express from "express";
const router = express.Router();
import { postsaveorders } from "../Controllers/orderitem.controller.js";
import { getgetorders } from "../Controllers/orderitem.controller.js";
import { postconfirm_payment } from "../Controllers/orderitem.controller.js";
import { patchorders } from "../Controllers/orderitem.controller.js";

router.post("/saveorders", postsaveorders);
router.get("/getorders", getgetorders);
router.post("/confirm-payment", postconfirm_payment);
router.patch("/orders/:id/paid", patchorders);

export default router;

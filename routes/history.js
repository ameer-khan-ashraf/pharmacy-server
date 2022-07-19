import express from "express";

import { getOrders } from "../controllers/history.js";
import auth from '../middleware/auth.js';


const router = express.Router();

router.get('/',auth,getOrders);

export default router
import express from "express"; 
import { getProducts,buyProduct, getProductDetail  } from "../controllers/product.js";
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/',auth,getProducts);
router.get('/:id/detail',auth,getProductDetail);
router.patch('/:id/buyproduct',auth,buyProduct);

export default router
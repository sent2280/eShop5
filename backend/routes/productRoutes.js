import express from "express";
const router = express.Router();
import { getProducts,createProduct,updateProduct,deleteProduct, createProductReview,getTopProducts,getProductById } from "../controllers/productController.js";
import { protect, admin } from '../middleware/authMiddleware.js';
import checkObjectId from '../middleware/checkObjectId.js';

// router.route( '/').get(getProducts).post(protect,admin,createProduct);
router.route( '/').get(getProducts).post(createProduct);
router.get('/top', getTopProducts);
router.route('/:id').get(checkObjectId,getProductById).
         put(updateProduct).delete(deleteProduct);
router.route('/:id/reviews').post(checkObjectId,createProductReview);

  export default router;
 // export default productRoutes;
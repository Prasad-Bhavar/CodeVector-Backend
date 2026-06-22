import { Router } from "express";

import productRoutes from "../modules/products/product.routes";
import categoryRoutes from "../modules/categories/category.routes";

const router = Router();

router.use("/products", productRoutes);
router.use("/categories", categoryRoutes);

export default router;
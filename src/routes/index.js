import { Router } from "express";
import routerAuth from "./auth";
import routerCategories from "./categories";
import routerProducts from "./products";
import routerUploadImages from "./uploadImages";

const router = Router();

router.use("/products", routerProducts);
router.use("/auth",routerAuth);
router.use("/categories",routerCategories);
router.use("/images",routerUploadImages);

export default router;

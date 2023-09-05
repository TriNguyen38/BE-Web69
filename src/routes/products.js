import { Router } from "express";
const routerProducts = Router ();


import {
    createProduct,
    deleteProduct,
    editProduct,
    getAll,
    getDetail,
  } from "../controller/products.js";
import { checkPermission } from "../middlewares/checkPermission.js";

  

routerProducts.get("/", getAll);
// get detail
routerProducts.get("/:id", getDetail);
// create
routerProducts.post("/",checkPermission, createProduct);
// edit
routerProducts.put("/:id", editProduct);
// move

// delete
routerProducts.delete("/:id", deleteProduct);
// tạo request

export default routerProducts;

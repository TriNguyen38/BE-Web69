import { Router } from "express";
const routerCategories = Router ();


import {
    createCategory,
    remove,
    update,
    getAll,
    getDetail,
  } from "../controller/categories";
import { checkPermission } from "../middlewares/checkPermission.js";

  

routerCategories.get("/", getAll);
// get detail
routerCategories.get("/:id", getDetail);
// createCategory
routerCategories.post("/",checkPermission, createCategory);
// edit
routerCategories.put("/:id", update);
// delete
routerCategories.delete("/:id", remove);
// tạo request

export default routerCategories;

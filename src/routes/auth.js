import { Router } from "express";
import { signUp, signIn } from "../controller/auth";
const routerAuth = Router();

routerAuth.post("/signup",signUp);
routerAuth.post("/signin",signIn);

export default routerAuth;

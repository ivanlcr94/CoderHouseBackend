import { Router } from "express";
import passport from "passport";
import Authenticated from "../../middlewares/index.js";
import compression from "compression";
import {controller} from '../../controllers/index.js'


const router = Router();

router.post("/login", passport.authenticate("login", {failureRedirect: "/faillogin"}), controller.login);

router.post("/register", passport.authenticate("register", {failureRedirect: "/failregister"}),controller.register);

router.get("/failregister", controller.failregister);

router.get("/faillogin", controller.faillogin);

router.get("/register", controller.getRegister);

router.get("/logout", controller.logout);

router.get("/login", Authenticated, compression(), controller.getLogin);

router.get("/", Authenticated, controller.home);

//router.post('/productos', controller.postProductos);

//router.get("/info", compression(), controller.info);

router.get('*', controller.rutaNoExiste)


export { router as UserRouter };
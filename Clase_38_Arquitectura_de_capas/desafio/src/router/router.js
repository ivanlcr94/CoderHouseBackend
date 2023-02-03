import express from "express";
import passport from "passport";
import Authenticated from "../middlewares/middlewars.js";
import compression from "compression";
import * as controller from '../controller/controller.js'


const router = express.Router();

router.post("/login", passport.authenticate("login", {failureRedirect: "/faillogin"}), controller.login);

router.post("/register", passport.authenticate("register", {failureRedirect: "/failregister"}),controller.register);

router.get("/failregister", controller.failregister);

router.get("/faillogin", controller.faillogin);

router.get("/register", controller.getRegister);

router.get("/logout", controller.logout);

router.get("/login", Authenticated, compression(), controller.getLogin);

router.get("/", Authenticated, controller.home);

router.post('/productos', controller.postProductos);

router.get("/info", compression(), controller.info);

router.get('*', controller.rutaNoExiste)


export default router;
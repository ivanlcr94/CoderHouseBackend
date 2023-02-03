import logger from '../../logger.js'
import {infoProcess, guardarProductos, getProductos} from '../negocio/logicaNegocio.js'

const login = (req, res) => {
    logger.info('ingreso a la ruta /login metodo:post')
        res.redirect("/");
    }
;

const register = (req, res) => {
    logger.info('ingreso a la ruta /register metodo:post')    
    res.redirect("/");
    }
;

const failregister = (req, res) => {
    logger.info('ingreso a la ruta /failregister metodo:get') 
    res.render("register-error", {});
};

const faillogin = (req, res) => {
    logger.info('ingreso a la ruta /faillogin metodo:get') 
    res.render("login-error", {});
};

const getRegister=  (req, res) => {
    logger.info('ingreso a la ruta /register metodo:get') 
    res.render("register");
};

const logout = (req, res) => {
    logger.info('ingreso a la ruta /logout metodo:get') 
    const {username} = req.user;
    req.logout();
    res.render("logout", {
        username
    });
};

const getLogin = (req, res) => {
    logger.info('ingreso a la ruta /login metodo:get') 
    res.render("login");
};

const home = (req, res) => {
    logger.info('ingreso a la ruta /') 
    res.redirect("login");
};



const postProductos = (req, res) => {
    logger.info('ingreso a la ruta /productos metodo:post') 
    const { producto, precio, urlImagen } = req.body;
    guardarProductos({ producto, precio, urlImagen })
    
    const productos = getProductos()
    res.render("home", { productos, username: req.user.username })

};


const info = (req, res) => {
    logger.info('ingreso a la ruta /info metodo:get') 
    const infoServer = infoProcess
    res.send(infoServer);
};


const rutaNoExiste = (req, res) => {
    logger.warn('esta ruta no existe')
    res.send('ruta no existe')
}


export  {
    login,
    register,
    failregister,
    faillogin,
    getRegister,
    logout,
    getLogin,
    home,
    postProductos,
    info,
    rutaNoExiste
};
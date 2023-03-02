
const login = (req, res) => {
        res.redirect("/");
    }
;

const register = (req, res) => { 
    res.redirect("/");
    }
;

const failregister = (req, res) => {
    res.render("register-error", {});
};

const faillogin = (req, res) => {
    res.render("login-error", {});
};

const getRegister=  (req, res) => {
    res.render("register");
};

const logout = (req, res) => {
    const {nombre} = req.user || "tiempo de sesion expirada";
    console.log(nombre)
    req.logout();
    res.render("logout", {
        nombre
    });
};

const getLogin = (req, res) => {
    res.render("login");
};

const home = (req, res) => {
    res.redirect("login");
};




/* const postProductos = (req, res) => {
    logger.info('ingreso a la ruta /productos metodo:post') 
    const { producto, precio, urlImagen } = req.body;
    guardarProductos({ producto, precio, urlImagen })
    
    const productos = getProductos()
    res.render("home", { productos, username: req.user.username })

}; */


/* const info = (req, res) => {
    logger.info('ingreso a la ruta /info metodo:get') 
    const infoServer = infoProcess
    res.send(infoServer);
}; */


const rutaNoExiste = (req, res) => {
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
    rutaNoExiste
};
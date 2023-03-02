import { UserModel } from "../models/index.js";
import bCrypt from "bcrypt";
import {sendMail} from "../services/Nodemailer/index.js"

const validatePassword = (user, password) => {
	return bCrypt.compareSync(password, user.password);
};
var createHash = function (password) {
	return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};
const login=(req, username, password, cb) => {
    UserModel.findOne({ username: username }, (err, user) => {
        if (err) return cb(err);
        if (!user) {
            console.log("User Not Found with username " + username);
            return cb(null, false);
        }
        if (!validatePassword(user, password)) {
            console.log("Invalid Password");
            return cb(null, false);
        }
        return cb(null, user);
    });
}

const register= (req, username, password, cb) =>{

    UserModel.findOne({ username: username }, function (err, user) {
        if (err) {
            console.log("Error in SignUp: " + err);
            return cb(err);
        }
        if (user) {
            console.log("User already exists");
            return cb(null, false);
        } else {
            const newUser = new UserModel();
            newUser.username = username;
            newUser.password = createHash(password);
            newUser.nombre = req.body.nombre;
            newUser.direccion = req.body.direccion;
            newUser.edad = req.body.edad;
            newUser.telefono = req.body.telefono;
            newUser.save().then(datos => cb(null,datos)).catch(null,false)
            const sendMailGmail = sendMail({
                to: 'ivanlcr94@gmail.com',
                subject: 'Nuevo registro',
                html: `<h1>Nuevo registro de ${newUser.username}</h1> 
                        <p>Nombre = ${newUser.nombre}</p>
                        <p>Dirección = ${newUser.direccion}</p>
                        <p>Edad = ${newUser.edad}</p>
                        <p>Telefono = ${newUser.telefono}</p>`
              })
              console.log('Nuevo registro ')
        }
    });
    
}

export {login,register}
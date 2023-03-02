import express from "express";
import { config } from "./config/index.js";
import { ProductRouter, CartRouter, UserRouter } from "./routers/index.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import handlebars from "express-handlebars";
import passport from "passport";
import cookieParser from "cookie-parser";
import { Strategy as LocalStrategy } from "passport-local";
import { UserModel } from "./models/index.js";
import * as strategy from "./passport/strategy.js";
import cors from "cors";

const app = express();

// esto es para poder habilitar cors para un cliente externo, ejemplo cuando levantamos la app de react
// bien podriamos convertirlo a un middleware en su archivo correspondiente y tener las propiedades que deseemos
app.use(cors({ origin: "http://localhost:3000" }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
//app.use(express.static("public"));

//------------------------------handlebars-----------------------------------//
app.engine("hbs",handlebars({extname: ".hbs",defaultLayout: "index.hbs",}));
app.set("view engine", "hbs");
app.set("views", "./src/views");
//----------------------------------------------------------------------------//

// -------------------Configurando connect-mongo session----------------------//
app.use(session({
  store:MongoStore.create({
    mongoUrl: config.DATABASES.mongo.url,
    dbName: config.DATABASES.mongo.dbName, //paso las credenciales por .env (variable de entorno)
    ttl:3600, // Session setiada en 1 hora
    collectionName:'sessions'
    
}),
secret:'secret',
resave: false,
saveUninitialized: false,
rolling: false,
cookie: {
  maxAge: 600000,
}
}))
//----------------------------------------------------------------------------//

app.use(passport.initialize());
app.use(passport.session());
app.use("/", UserRouter);
app.use("/api/products", ProductRouter);
app.use("/api/cart", CartRouter);

//--------------------------------passport-----------------------------------//

passport.use(
  "login",
  new LocalStrategy({ passReqToCallback: true }, strategy.login)
);

passport.use(
  "register",
  new LocalStrategy({ passReqToCallback: true }, strategy.register)
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  UserModel.findById(id, function (err, user) {
    done(err, user);
  });
});

//----------------------------------------------------------------------------//

const server = app.listen(config.SERVER.PORT, () =>
  console.log(`Server running on port ${server.address().port}`)
);

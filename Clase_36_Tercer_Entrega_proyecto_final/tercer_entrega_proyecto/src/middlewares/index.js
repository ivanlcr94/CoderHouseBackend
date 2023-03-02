const Authenticated=(req,res,next)=>{
    if (req.isAuthenticated()) 
        return res.render("home", { nombre: req.user.nombre});
    next()
}
export default Authenticated
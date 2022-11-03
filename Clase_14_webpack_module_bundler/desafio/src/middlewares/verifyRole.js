const IS_ADMIN = true

const verifyrole = (req, res, nex) => {

    if(!IS_ADMIN) return res.send({ error: "Usuario no autorizado" })

    nex()
}

export {verifyrole}
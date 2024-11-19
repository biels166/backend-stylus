const UserModel = require('../model/UserModel')

const EmailValidation = async (req, res, next) => {
    if (!req.body.email) 
        return res.status(400).json({ error: 'O Email é de preenchimento obrigatório.' })
    else
        next()
}

module.exports = EmailValidation;
const UserModel = require('../model/UserModel')

const UserValidation = async (req, res, next) => {
    const { name, email, user, password } = req.body

    if (!name)
        return res.status(400).json({ error: 'O Nome é de preenchimento obrigatório.' })
    /*else if (!password)
        return res.status(400).json({ error: 'A senha é de preenchimento obrigatório.' })*/
    else if (!email)
        return res.status(400).json({ error: 'O Email é de preenchimento obrigatório.' })
    else if (!user)
        return res.status(400).json({ error: 'O login é de preenchimento obrigatório.' })
    else {
        if (!req.params.id) {
            let exists = await UserModel.findOne({ 'email': { '$eq': email } })

            if (exists) {
                return res.status(400).json({ error: 'Email já cadastrado.' })
            }
        }
        else {
            let exists = await UserModel.findOne(
                {
                    'email': { '$eq': email },
                    '_id': { '$ne': req.params.id }
                })

            if (exists) {
                return res.status(400).json({ error: 'Email já cadastrado.' })
            }
        }
    }

    next()
}

module.exports = UserValidation;
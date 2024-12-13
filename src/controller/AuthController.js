const UserModel = require('../model/UserModel')
const ProtectRoles = require('../utils/ProtectRoles')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const CryptoJS = require('crypto-js')
const { env } = require('node:process')

class AuthController {
    async AuthLogin(req, res) {
        const { login, password, callFromFront } = req.body

        await UserModel.find({
            $or: [
                { 'email': login },
                { 'user': login }
            ]
        })
            .then(async response => {
                if (response.length > 0) {
                    const userDB = response[0]
                    const passwordEntered = !callFromFront ? password : CryptoJS.AES.decrypt(password, env.SCRT_INTEGRATION).toString(CryptoJS.enc.Utf8)
                    const isValidPassword = await bcrypt.compare(passwordEntered, userDB.password)
                    const protectRoles = await ProtectRoles(userDB.roles)

                    if (isValidPassword) {
                        const token = jwt.sign({
                            _id: userDB._id,
                            email: userDB.email,
                            user: userDB.user,
                            name: userDB.name,
                            admnistrator: userDB.admnistrator,
                            roles: protectRoles
                        },
                            env.JWT_SECRET,
                            {
                                expiresIn: env.JWT_EXPIRESIN,
                                encoding: 'utf-8'
                            }
                        )

                        return res.status(200).json({
                            msg: "Usuário autenticado com sucesso.",
                            token,
                            expiresIn: new Date(jwt.decode(token).exp * 1000),
                            user: {
                                _id: userDB._id,
                                email: userDB.email,
                                login: userDB.user,
                                name: userDB.name,
                                admnistrator: userDB.admnistrator,
                                roles: protectRoles
                            }
                        })
                    }
                    else {
                        return res.status(400).json({ error: 'Senha Inválida' })
                    }
                }
                else {
                    return res.status(404).json({ error: 'Usuário não encontrado' })
                }
            })
            .catch(error => {
                console.log("response error", error)

                return res.status(500).json(error)
            })
    }

    async GenerateTokenByEmail(req, res) {
        await UserModel.find({ 'email': req.body.email })
            .then(async response => {
                if (response.length > 0) {
                    const userDB = response[0]

                    const token = jwt.sign({
                        _id: userDB._id,
                        email: userDB.email,
                        user: userDB.user,
                        name: userDB.name,
                        admnistrator: userDB.admnistrator,
                        roles: await ProtectRoles(userDB.roles)
                    },
                        env.JWT_SECRET,
                        { expiresIn: env.JWT_EXPIRESIN }
                    )

                    return res.status(200).json({
                        msg: "Token gerado com sucesso",
                        token,
                        expiresIn: new Date(jwt.decode(token).exp * 1000)
                    })
                }
                else {
                    return res.status(404).json({ error: 'Usuário não encontrado' })
                }
            })
            .catch(error => {
                console.log("response error", error)

                return res.status(500).json(error)
            })
    }


}

module.exports = new AuthController()
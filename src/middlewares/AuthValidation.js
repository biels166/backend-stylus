const jwt = require('jsonwebtoken')
const { env } = require('node:process');
const UserModel = require('../model/UserModel');

const CheckPrivateRouter = (requiredRoles = []) => {
    return async (req, res, next) => {
        const authHeader = req.headers['authorization']
        const token = authHeader?.split(' ')[1]

        if (!token) {
            return res.status(401).json({ error: 'Não autorizado - Token Inválido' })
        }

        try {
            try {
                const jwtData = jwt.verify(token, env.JWT_SECRET)

                if (jwtData.admnistrator) {
                    return next()
                } else {
                    const dbData = await UserModel.findById(jwtData._id)
                    const roles = dbData.roles

                    const filteredRequiredRoles = requiredRoles.filter(role => role != env.ADMINISTRADOR)

                    if (filteredRequiredRoles.every(requiredRole => roles.includes(requiredRole)))
                        return next()
                }

                return res.status(401).json({ error: 'Permissão insuficiente' })

            } catch (error) {
                console.error('Erro no CheckUserRoles:', error);

                if (jwt.JsonWebTokenError) {
                    return res.status(500).json({ error: 'Erro ao verificar Token' })
                }
                else if (jwt.TokenExpiredError) {
                    return res.status(403).json({ error: 'Token Expirado' })
                }
                else {
                    return res.status(401).json({ error: 'Token inválido' })
                }
            }
        } catch (error) {
            console.error('Erro no CheckPrivateRouter:', error)
            return res.status(500).json({ error: 'Erro interno no servidor' })
        }
    }
};

const CheckUserRoles = (requiredRoles = []) => {
    return async (req, res, next) => {
        const authHeader = req.headers['authorization']
        const token = authHeader?.split(' ')[1]

        if (!token) {
            return res.status(401).json({ error: 'Não autorizado - Token Ausente' })
        }

        try {
            const jwtData = jwt.verify(token, env.JWT_SECRET)
            const userRoles = jwtData.roles.split(' ')
            const isAdm = userRoles.includes(env.ADMINISTRADOR)
            const filteredRequiredRoles = requiredRoles.filter(role => role != env.ADMINISTRADOR)
            const hasAllRoles = filteredRequiredRoles.every(requiredRole => userRoles.includes(requiredRole));

            if (hasAllRoles || isAdm) {
                return next()
            } else {
                return res.status(403).json({ error: 'Permissão insuficiente' })
            }
        } catch (error) {
            console.error('Erro no CheckUserRoles:', error);

            if (jwt.JsonWebTokenError) {
                return res.status(403).json({ error: 'Token Expirado' })
            }
            else {
                return res.status(401).json({ error: 'Token inválido' })
            }
        }
    }
};

module.exports = {
    CheckPrivateRouter,
    CheckUserRoles
}

const { env } = require('node:process')

async function ProtectRoles(userRoles = []) {
    let roles = [];

    if (userRoles.some(role => role.includes('_USER')))
        roles.push(
            { description: 'VISUALIZAR USUÁRIO', value: userRoles.includes(env.VISUALIZAR_USUARIO), category: 'usuario' },
            { description: 'ADICIONAR USUÁRIO', value: userRoles.includes(env.ADICIONAR_USUARIO), category: 'usuario' },
            { description: 'EDITAR USUÁRIO', value: userRoles.includes(env.EDITAR_USUARIO), category: 'usuario' },
            { description: 'REMOVER USUÁRIO', value: userRoles.includes(env.REMOVER_USUARIO), category: 'usuario' }
        );

    if (userRoles.some(role => role.includes('_CLIENT')))
        roles.push(
            { description: 'VISUALIZAR CLIENTE', value: userRoles.includes(env.VISUALIZAR_CLIENTE), category: 'cliente' },
            { description: 'ADICIONAR CLIENTE', value: userRoles.includes(env.ADICIONAR_CLIENTE), category: 'cliente' },
            { description: 'EDITAR CLIENTE', value: userRoles.includes(env.EDITAR_CLIENTE), category: 'cliente' },
            { description: 'REMOVER CLIENTE', value: userRoles.includes(env.REMOVER_CLIENTE), category: 'cliente' }
        );

    if (userRoles.some(role => role.includes('_PARTNER')))
        roles.push(
            { description: 'VISUALIZAR PARCEIRO', value: userRoles.includes(env.VISUALIZAR_PARCEIRO), category: 'parceiro' },
            { description: 'ADICIONAR PARCEIRO', value: userRoles.includes(env.ADICIONAR_PARCEIRO), category: 'parceiro' },
            { description: 'EDITAR PARCEIRO', value: userRoles.includes(env.EDITAR_PARCEIRO), category: 'parceiro' },
            { description: 'REMOVER PARCEIRO', value: userRoles.includes(env.REMOVER_PARCEIRO), category: 'parceiro' }
        );

    if (userRoles.some(role => role.includes('_PRODUCT')))
        roles.push(
            { description: 'VISUALIZAR PRODUTO', value: userRoles.includes(env.VISUALIZAR_PRODUTO), category: 'produto' },
            { description: 'ADICIONAR PRODUTO', value: userRoles.includes(env.ADICIONAR_PRODUTO), category: 'produto' },
            { description: 'EDITAR PRODUTO', value: userRoles.includes(env.EDITAR_PRODUTO), category: 'produto' },
            { description: 'REMOVER PRODUTO', value: userRoles.includes(env.REMOVER_PRODUTO), category: 'produto' }
        );

    if (userRoles.some(role => role.includes('_MATERIAL')))
        roles.push(
            { description: 'VISUALIZAR MATERIAL', value: userRoles.includes(env.VISUALIZAR_MATERIAL), category: 'material' },
            { description: 'ADICIONAR MATERIAL', value: userRoles.includes(env.ADICIONAR_MATERIAL), category: 'material' },
            { description: 'EDITAR MATERIAL', value: userRoles.includes(env.EDITAR_MATERIAL), category: 'material' },
            { description: 'REMOVER MATERIAL', value: userRoles.includes(env.REMOVER_MATERIAL), category: 'material' }
        );

    if (userRoles.some(role => role.includes('_QUOTE')))
        roles.push(
            { description: 'VISUALIZAR COTAÇÃO', value: userRoles.includes(env.VISUALIZAR_COTACAO), category: 'cotacao' },
            { description: 'ADICIONAR COTAÇÃO', value: userRoles.includes(env.ADICIONAR_COTACAO), category: 'cotacao' },
            { description: 'EDITAR COTAÇÃO', value: userRoles.includes(env.EDITAR_COTACAO), category: 'cotacao' },
            { description: 'REMOVER COTAÇÃO', value: userRoles.includes(env.REMOVER_COTACAO), category: 'cotacao' }
        );

    if (userRoles.some(role => role.includes('_OS')))
        roles.push(
            { description: 'VISUALIZAR OS', value: userRoles.includes(env.VISUALIZAR_OS), category: 'ordem' },
            { description: 'ADICIONAR OS', value: userRoles.includes(env.ADICIONAR_OS), category: 'ordem' },
            { description: 'EDITAR OS', value: userRoles.includes(env.EDITAR_OS), category: 'ordem' },
            { description: 'REMOVER OS', value: userRoles.includes(env.REMOVER_OS), category: 'ordem' }
        );

    return roles;
};


module.exports = ProtectRoles;
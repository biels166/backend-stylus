const { env } = require('node:process')

const ExtractRoles = (userRoles) => {
    let roles = []

    let list = userRoles?.map(user => user.description)

    if (list.includes('VISUALIZAR USUÁRIO')) roles.push(env.VISUALIZAR_USUARIO);
    if (list.includes('ADICIONAR USUÁRIO')) roles.push(env.ADICIONAR_USUARIO);
    if (list.includes('EDITAR USUÁRIO')) roles.push(env.EDITAR_USUARIO);
    if (list.includes('REMOVER USUÁRIO')) roles.push(env.REMOVER_USUARIO);
    if (list.includes('VISUALIZAR CLIENTE')) roles.push(env.VISUALIZAR_CLIENTE);
    if (list.includes('ADICIONAR CLIENTE')) roles.push(env.ADICIONAR_CLIENTE);
    if (list.includes('EDITAR CLIENTE')) roles.push(env.EDITAR_CLIENTE);
    if (list.includes('REMOVER CLIENTE')) roles.push(env.REMOVER_CLIENTE);
    if (list.includes('VISUALIZAR PARCEIRO')) roles.push(env.VISUALIZAR_PARCEIRO);
    if (list.includes('ADICIONAR PARCEIRO')) roles.push(env.ADICIONAR_PARCEIRO);
    if (list.includes('EDITAR PARCEIRO')) roles.push(env.EDITAR_PARCEIRO);
    if (list.includes('REMOVER PARCEIRO')) roles.push(env.REMOVER_PARCEIRO);
    if (list.includes('VISUALIZAR PRODUTO')) roles.push(env.VISUALIZAR_PRODUTO);
    if (list.includes('ADICIONAR PRODUTO')) roles.push(env.ADICIONAR_PRODUTO);
    if (list.includes('EDITAR PRODUTO')) roles.push(env.EDITAR_PRODUTO);
    if (list.includes('REMOVER PRODUTO')) roles.push(env.REMOVER_PRODUTO);
    if (list.includes('VISUALIZAR MATERIAL')) roles.push(env.VISUALIZAR_MATERIAL);
    if (list.includes('ADICIONAR MATERIAL')) roles.push(env.ADICIONAR_MATERIAL);
    if (list.includes('EDITAR MATERIAL')) roles.push(env.EDITAR_MATERIAL);
    if (list.includes('REMOVER MATERIAL')) roles.push(env.REMOVER_MATERIAL);
    if (list.includes('VISUALIZAR COTAÇÃO')) roles.push(env.VISUALIZAR_COTACAO);
    if (list.includes('ADICIONAR COTAÇÃO')) roles.push(env.ADICIONAR_COTACAO);
    if (list.includes('EDITAR COTAÇÃO')) roles.push(env.EDITAR_COTACAO);
    if (list.includes('REMOVER COTAÇÃO')) roles.push(env.REMOVER_COTACAO);
    if (list.includes('VISUALIZAR OS')) roles.push(env.VISUALIZAR_OS);
    if (list.includes('ADICIONAR OS')) roles.push(env.ADICIONAR_OS);
    if (list.includes('EDITAR OS')) roles.push(env.EDITAR_OS);
    if (list.includes('REMOVER OS')) roles.push(env.REMOVER_OS);

    return roles;
};


module.exports = ExtractRoles;
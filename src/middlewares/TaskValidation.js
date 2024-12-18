
const TaskValidation = async (req, res, next) => {
    if (!req.body.title)
        return res.status(400).json({ error: 'O título da tarefa é de preenchimento obrigatório.' })
    else if (!req.body.date)
        return res.status(400).json({ error: 'A data da tarefa é de preenchimento obrigatório.' })
    else if (!req.body.type)
        return res.status(400).json({ error: 'O data da tarefa é de seleção obrigatório.' })

    next()
}

module.exports = TaskValidation;
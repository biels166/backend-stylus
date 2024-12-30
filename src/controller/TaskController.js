const { startOfDay, endOfDay, startOfMonth, endOfMonth, startOfWeek, endOfWeek } = require('date-fns')
const TaskModel = require('../model/TaskModel')
const GenerateTaskStatus = require('../utils/GenerateTaskState')
const currentDate = new Date()

class TaskController {
    async register(req, res) {
        await new TaskModel({ ...req.body })
            .save()
            .then(response => {
                return res.status(200).json({
                    task: response,
                    msg: 'Tarefa cadastrada com sucesso.'
                })
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }

    async update(req, res) {
        try {
            await TaskModel.findByIdAndUpdate({ '_id': req.params.id }, req.body, { new: true })
                .then(response => {
                    return res.status(200).json({
                        task: response,
                        msg: 'Atualizações salvas com sucesso.'
                    })
                })
                .catch(error => {
                    return res.status(500).json(error)
                })
        }
        catch (error) {
            return res.status(522).json({ error: 'Ocorreu um erro inesperado.' })
        }
    }

    async delete(req, res) {
        await TaskModel.findByIdAndDelete(req.params.id)
            .then(response => {
                return res.status(200).json({ message: 'Tarefa removida com sucesso' })
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }

    async list(req, res) {
        const { userId, pageNumber, rowsPage, type, status, dateFilter } = req.body

        let filter = {
            _id: { '$ne': null },
            userId: { '$eq': userId }
        }

        if (type)
            filter = { ...filter, type: { '$eq': type } }

        /*
            { description: 'Em Andamento', value: 1 },
            { description: 'Concluídas', value: 2 },
            { description: 'Todas', value: 3 }
        */
        if (status && status !== 3)
            filter = { ...filter, status: { '$eq': status === 2 } }

        switch (dateFilter) {
            case 'today':
                filter = { ...filter, date: { '$gte': startOfDay(currentDate), '$lt': endOfDay(currentDate) } }
                break

            case 'week':
                filter = { ...filter, date: { '$gte': startOfWeek(currentDate), '$lt': endOfWeek(currentDate) } }
                break

            case 'month':
                filter = { ...filter, date: { '$gte': startOfMonth(currentDate), '$lt': endOfMonth(currentDate) } }
                break

            case 'late':
                filter = { ...filter, date: { '$lt': currentDate }, status: { '$eq': false } }
                break

            default:
                filter = { ...filter }
                break
        }

        console.log("filter", filter)

        try {
            const total = await TaskModel.countDocuments(filter)
            const pages = Math.ceil(total / rowsPage)

            const tasksFromDB = await TaskModel.find(filter)
                .sort({ date: 1 })
                .skip((pageNumber * rowsPage))
                .limit(rowsPage)

            const tasks = await Promise.all(
                tasksFromDB.map(async (task) => ({
                    ...task.toObject(),
                    state: await GenerateTaskStatus(task, currentDate)
                }))
            );

            return await res.status(200).json({
                total,
                pages,
                tasks
            })
        }
        catch (error) {
            return res.status(500).json(error)
        }

    }

    async late(req, res) {
        await TaskModel.find({
            'userId': req.body.userId,
            'date': { '$lt': currentDate }
        })
            .sort({ date: -1 })
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }

    async today(req, res) {
        await TaskModel.find({
            'userId': req.body.userId,
            'date': { '$gte': startOfDay(currentDate), '$lt': endOfDay(currentDate) }
        })
            .sort({ date: -1 })
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json(error)
            })

    }

    async week(req, res) {
        await TaskModel.find({
            'userId': req.body.userId,
            'date': { '$gte': startOfWeek(currentDate), '$lt': endOfWeek(currentDate) }
        })
            .sort({ date: -1 })
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json(error)
            })

    }

    async month(req, res) {
        await TaskModel.find({
            'userId': req.body.userId,
            'date': { '$gte': startOfMonth(currentDate), '$lt': endOfMonth(currentDate) }
        })
            .sort({ date: -1 })
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json(error)
            })

    }

}

module.exports = new TaskController()
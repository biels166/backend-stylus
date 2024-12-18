const { startOfDay, endOfDay, startOfMonth, endOfMonth, startOfWeek, endOfWeek } = require('date-fns')

const GenerateTaskStatus = (task, currentDate) => {
    if (task.status)
        return 'Concluída'

    if (startOfDay(currentDate) <= task.date && task.date <= endOfDay(currentDate))
        return 'Hoje' 

    if (task.date < currentDate)
        return 'Atrasada' 

    if (startOfWeek(currentDate) <= task.date && task.date <= endOfWeek(currentDate))
        return 'Próxima de Vencer' 

    if (startOfMonth(currentDate) <= task.date && task.date <= endOfMonth(currentDate))
        return 'Em dia' 

    if (task.date < startOfMonth(currentDate))
        return 'Em dia' 
}

module.exports = GenerateTaskStatus;
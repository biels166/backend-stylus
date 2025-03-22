const { startOfDay, endOfDay, startOfMonth, startOfWeek, endOfWeek } = require('date-fns')
const currentDate = new Date()
const tomorrow = new Date().setDate(currentDate.getDate() + 1)

const GenerateOrderStatusStyle = (order) => {
    if (order.status === 'Concluída')
        return 'Concluída'

    if (startOfDay(currentDate) <= order.deliveryDate && order.deliveryDate <= endOfDay(currentDate))
        return 'Hoje' 

    if (order.deliveryDate < currentDate)
        return 'Atrasada' 

    if (startOfWeek(currentDate) <= order.deliveryDate && order.deliveryDate <= endOfWeek(currentDate))
        return 'Essa Semana' 

    if (startOfDay(tomorrow) <= order.deliveryDate && order.deliveryDate <= endOfDay(tomorrow))
        return 'Amanhã'

    if (order.deliveryDate < startOfMonth(currentDate))
        return 'Em dia' 
}

module.exports = GenerateOrderStatusStyle;
const connection = require("./connectionModel")

const getAll = async () => {
    const tasks = await connection.execute('SELECT * FROM tasks')
    return tasks
}

// exportando como objeto poise teremos varias funcoes dentro de getAll

module.exports = {
    getAll
}
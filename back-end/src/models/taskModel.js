const connection = require("./connectionModel")

const getAll = async () => {
    const [tasks, buffer] = await connection.execute('SELECT * FROM tasks')
    return tasks
}

const createTask = async (task) => {
    const { title } = task; // vou receber um objeto e pegar o titulo dele para salvar no banco

    const dateUTC = new Date(Date.now())

    const date = dateUTC.toLocaleString()

    const query = 'INSERT INTO tasks(title, status, created_at) VALUES (?, ?, ?)';

    const [createTask] = await connection.execute(query, [title, "Pendente", date]) // esse array vai escrever nos VALUES

    return createTask
}

const deleteTask = async (id) => {
    const removeTask = await connection.execute('DELETE FROM tasks WHERE id = ?', [id])

    return removeTask
}

const updateTask = async (id, task) => {
    const {title, status} = task

    const query = 'UPDATE tasks SET title = ?, status = ? WHERE id = ?';

    const updateTask = await connection.execute(query, [title, status, id])

    return updateTask
}

// exportando como objeto poise teremos varias funcoes dentro de getAll

module.exports = {
    getAll,
    createTask,
    deleteTask,
    updateTask,
}
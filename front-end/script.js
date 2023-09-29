const fetchTasks = async () => {
    const response = await fetch("http://localhost:3003/tasks")
    const tasks = await response.json()
    return tasks
}

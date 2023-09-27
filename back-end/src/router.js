const express = require("express")

const router = express.Router()

const taskControllers = require("./controllers/taskControllers")
const taskMiddleware = require("./middlewares/tasksMiddleware")

router.get("/tasks", taskControllers.getAll)
router.post("/tasks", taskMiddleware.validateFieldTitle, taskControllers.createdTask)
router.delete("/tasks/:id", taskControllers.deleteTask)
router.put("/tasks/:id", taskMiddleware.validateFieldTitle,
    taskMiddleware.validadeFieldStatus, 
    taskControllers.updateTask)

module.exports = router
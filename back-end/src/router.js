const express = require("express")

const router = express.Router()

const taskControllers = require("./controllers/taskControllers")

router.get("/tasks", taskControllers.getAll)

module.exports = router
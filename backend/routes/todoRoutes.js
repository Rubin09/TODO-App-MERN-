const express = require('express')
const authMiddleware = require('../middleware/authMiddleware')
const { getTodoController, createTodoController, deleteTodoController, updateTodoController } = require('../controller/todoController')

const router = express.Router()

router.get('/gettodo/:userId', authMiddleware, getTodoController)
      .post('/create', authMiddleware, createTodoController)
      .delete('/delete/:id', authMiddleware, deleteTodoController)
      .put('/update/:id',authMiddleware, updateTodoController)

module.exports = router

const todoModel = require('../model/todoModel')

const createTodoController = async (req, res) => {
  try {
    const { title, description } = req.body
    const createdBy = req.user.id
    if (!title || !description) {
      return res.status(500).json({
        message: 'please provide title and description',
        success: false,
      })
    }
    const todo = new todoModel({ title, description, createdBy })
    const result = await todo.save()
    res
      .status(200)
      .json({ message: 'your task has been created', success: true, result })
  } catch (err) {
    console.log(err)
    res.status(500).send({
      success: false,
      message: 'erorr in create todo api',
      err,
    })
  }
}

const getTodoController = async (req, res) => {
  try {
    const { userId } = req.params

    //validate
    if (!userId) {
      return res.status(404).json({
        message: 'user not found',
        success: false,
      })
    }
    const todos = await todoModel.find({ createdBy: userId })
    if (!todos) {
      return res.status(404).send({
        success: true,
        message: 'you have no todos ',
      })
    }
    res.status(200).send({
      success: true,
      message: 'Your Todos',
      todos,
    })
  } catch (err) {
    console.log(err)
    return res
      .status(500)
      .send({ message: 'failed to fetch todo', success: false, err })
  }
}

const updateTodoController = async (req, res) => {
  try {
    const { id } = req.params
    if (!id) {
      return res.status(404).json({ message: 'todo not found', success: false })
    }
    const data = req.body

    const todo = await todoModel.findByIdAndUpdate(
      id,
      { $set: data },
      { returnOriginal: false }
    )

    return res.status(200).json({
      message: 'updated successfully',
      success: true,
      todo,
    })
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      message: 'could not update todo',
      success: false,
      err,
    })
  }
}

const deleteTodoController = async (req, res) => {
  try {
    const { id } = req.params
    const todo = await todoModel.findByIdAndDelete({ _id: id })
    if (!todo) {
      return res.status(404).send({
        success: false,
        message: 'No task found',
      })
    }

    return res.status(200).send({
      success: true,
      message: 'Your Task Has Been Deleted',
    })
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      message: 'could not delete todo',
      success: false,
      err,
    })
  }
}

module.exports = {
  deleteTodoController,
  createTodoController,
  updateTodoController,
  getTodoController,
}

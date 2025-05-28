import axios from 'axios'

//get user token
const user = JSON.parse(localStorage.getItem('todoapp'))

//default auth header
axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`

//CRETE TODO
const createTodo = (data) => {
  return axios.post('http://localhost:7000/api/v1/todo/create', data)
}
//GET ALL TODO
const getAllTodo = (id) => {
  return axios.get(`http://localhost:7000/api/v1/todo/gettodo/${id}`)
}
//delete task
const deleteTodo = (id) =>
  axios.delete(`http://localhost:7000/api/v1/todo/delete/${id}`)

//update task
const updateTodo = (id, data) =>
  axios.put(`http://localhost:7000/api/v1/todo/update/${id}`, data)
const TodoServices = { createTodo, getAllTodo, deleteTodo, updateTodo }
export default TodoServices

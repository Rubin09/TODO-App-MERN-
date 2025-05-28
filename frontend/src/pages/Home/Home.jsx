import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Layout/Navbar'
import PopModal from '../../components/PopModal'
import TodoServices from '../../Services/TodoServices'
import Card from '../../components/Card/Card' // assume this displays a list of tasks

const Home = () => {
  const [showModal, setShowModal] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [allTask, setAllTask] = useState([])
  const [activeTab, setActiveTab] = useState('All')
  const [isEditing, setIsEditing] = useState(false)
  const [editingId, setEditingId] = useState(null)

  const openModalHandler = () => {
    setTitle('')
    setDescription('')
    setIsEditing(false)
    setShowModal(true)
  }

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('todoapp'))
    const id = userData?.user?.id
    const getUserTask = async () => {
      try {
        const { data } = await TodoServices.getAllTodo(id)
        setAllTask(data?.todos || [])
      } catch (error) {
        console.log(error)
      }
    }
    getUserTask()
  }, [])

  const handleDelete = async (id) => {
    try {
      await TodoServices.deleteTodo(id)
      setAllTask((prev) => prev.filter((task) => task._id !== id))
    } catch (err) {
      console.error('Error deleting task:', err)
    }
  }

  const handleEdit = (task) => {
    setTitle(task.title)
    setDescription(task.description)
    setEditingId(task._id)
    setIsEditing(true)
    setShowModal(true)
  }

  const handleSave = async () => {
    try {
      const newData = { title, description }
      if (isEditing) {
        await TodoServices.updateTodo(editingId, newData  )
        setAllTask((prev) =>
          prev.map((task) =>
            task._id === editingId ? { ...task, ...newData } : task
          )
        )
      } else {
        const { data } = await TodoServices.createTodo(newData)
        setAllTask((prev) => [...prev, data.result])
      }
      setShowModal(false)
      setTitle('')
      setDescription('')
      setIsEditing(false)
      setEditingId(null)
    } catch (err) {
      console.error('Error saving task:', err)
    }
  }

  const filteredTasks = allTask.filter((task) => {
    if (activeTab === 'Active') return !task.isCompleted
    if (activeTab === 'Completed') return task.isCompleted
    return true
  })

  return (
    <>
      <Navbar />
      <div className="container py-5">
        <div className="card shadow-sm">
          <div className="card-body p-4">
            <h3 className="mb-4">My To-Do List</h3>

            {/* Tab Navigation */}
            <ul className="nav nav-tabs mb-4">
              {['All', 'Active', 'Completed'].map((tab) => (
                <li className="nav-item" key={tab}>
                  <button
                    className={`nav-link ${activeTab === tab ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                </li>
              ))}
            </ul>

            {/* Task Search & Add */}
            <div className="d-flex justify-content-between align-items-center mb-3">
              <input
                type="search"
                className="form-control me-3"
                placeholder="Search tasks..."
                style={{ maxWidth: '60%' }}
              />
              <button className="btn btn-primary" onClick={openModalHandler}>
                <i className="fas fa-plus me-2"></i>Create Task
              </button>
            </div>

            {/* Tasks Display */}
            {filteredTasks.length > 0 ? (
              <Card
                allTask={filteredTasks}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ) : (
              <p className="text-muted text-center mt-4">No tasks to show.</p>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      <PopModal
        showModal={showModal}
        setShowModal={setShowModal}
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        handleSave={handleSave}
        isEditing={isEditing}
      />
    </>
  )
}

export default Home

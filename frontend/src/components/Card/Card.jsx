const Card = ({ allTask, onDelete, onEdit }) => {
  return (
    <div className="mt-3">
      {allTask?.map((task, i) => (
        <div
          className="d-flex justify-content-between align-items-start bg-dark text-white rounded p-3 mb-3 shadow-sm"
          key={i}
        >
          <div className="d-flex flex-grow-1">
            <input
              className="form-check-input me-3 mt-1"
              type="checkbox"
              defaultChecked={task?.isCompleted}
              style={{ width: '20px', height: '20px' }}
              disabled
            />
            <div>
              <h5
                style={{
                  textDecoration: task?.isCompleted ? 'line-through' : 'none',
                  color: task?.isCompleted ? '#aaa' : '#fff',
                }}
              >
                {task?.title}
              </h5>
              <p className="mb-2" style={{ color: '#ccc' }}>
                {task?.description}
              </p>
              <div className="d-flex gap-2 flex-wrap">
                <span className="badge bg-secondary">
                  <i className="fa-regular fa-clock me-1"></i>
                  Created:{' '}
                  {new Date(task?.createdAt).toLocaleDateString('en-GB')}     
                </span>
              </div>
            </div>
          </div>

          <div className="ms-3 text-end">
            <button
              className="btn btn-sm btn-outline-info me-2"
              title="Edit Task"
              onClick={() => onEdit(task)}
            >
              <i className="fa-solid fa-pen-to-square"></i>
            </button>
            <button
              className="btn btn-sm btn-outline-danger"
              title="Delete Task"
              onClick={() => onDelete(task?._id)}
            >
              <i className="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Card

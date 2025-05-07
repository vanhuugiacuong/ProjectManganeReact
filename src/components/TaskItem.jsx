import { useContext, useState } from 'react';
import { ProjectsDispatchContext } from '../context/ProjectsContext';
import EditIcon from '@mui/icons-material/Edit';
import { Fab } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';


function TaskItem({ task, projectId, allProjects, setIsEditingTask }) {
  const dispatch = useContext(ProjectsDispatchContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTaskName, setEditedTaskName] = useState(task.name);
  const [moveToProjectId, setMoveToProjectId] = useState(projectId);

  const handleToggle = () => {
    dispatch({ type: 'TOGGLE_TASK', payload: { projectId, taskId: task.id } });
  };

  const handleDelete = () => {
    dispatch({ type: 'DELETE_TASK', payload: { projectId, taskId: task.id } });
  };

  const handleEdit = () => {
    if (editedTaskName.trim() === '') return;
    dispatch({
      type: 'EDIT_TASK',
      payload: { projectId, taskId: task.id, name: editedTaskName },
    });
    setIsEditing(false);
  };

  const handleMove = () => {
    if (moveToProjectId === projectId) return;
    dispatch({
      type: 'MOVE_TASK_BETWEEN_PROJECTS',
      payload: { fromId: projectId, toId: moveToProjectId, taskId: task.id },
    });
  };

  const handleAddTask = () => {
    if (!taskName.trim()) return;
    dispatch({
      type: 'ADD_TASK',
      payload: { projectId, task: { id: uuidv4(), name: taskName, done: false } }
    });
    setTaskName('');
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setIsEditingTask(true); // Thông báo cho App rằng task đang được chỉnh sửa
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setIsEditingTask(false); // Thông báo cho App rằng task không còn được chỉnh sửa
  };

  return (
    <li className="flex items-center justify-between bg-gray-100 rounded-lg p-3">
      <div className="flex items-center gap-3 flex-1">
        <input type="checkbox" checked={task.done} onChange={handleToggle} />
        {isEditing ? (
          <>
            <input
              value={editedTaskName}
              onChange={e => setEditedTaskName(e.target.value)}
              className="border p-1 rounded flex-1"
            />
            <button onClick={handleEdit} className="bg-blue-500 text-white px-2 py-1 rounded">Lưu</button>
            <button onClick={handleCancelEdit} className="bg-blue-300 px-2 py-1 rounded">Hủy</button>
          </>
        ) : (
          <>
            <span className={`flex-1 ${task.done ? 'line-through text-gray-400' : ''}`}>{task.name}</span>
            <Fab size='small' onClick={handleEditClick} color="info" aria-label="edit">
              <EditIcon />
            </Fab>
            <Fab size='small' onClick={handleDelete} color="error" aria-label="delete">
              <DeleteIcon />
            </Fab>
          </>
        )}
      </div>

      <div className="flex items-center gap-2">
        <select
          value={moveToProjectId}
          onChange={e => setMoveToProjectId(e.target.value)}
          className="ml-2 border p-1 rounded"
        >
          {allProjects.map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
        <button onClick={handleMove} className="bg-indigo-500 text-white px-3 py-1 rounded">
          Chuyển
        </button>
      </div>
    </li>
  );
}


export default TaskItem;

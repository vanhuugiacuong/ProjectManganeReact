import { useContext, useState } from 'react';
import { ProjectsDispatchContext } from '../context/ProjectsContext';

function TaskItem({ task, projectId, allProjects }) {
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
            <button onClick={() => setIsEditing(false)} className="bg-gray-300 px-2 py-1 rounded">Hủy</button>
          </>
        ) : (
          <>
            <span className={`flex-1 ${task.done ? 'line-through text-gray-400' : ''}`}>{task.name}</span>
            <button onClick={() => setIsEditing(true)} className="text-yellow-600 px-2">✏️</button>
            <button onClick={handleDelete} className="text-red-500 px-2">🗑️</button>
          </>
        )}
      </div>

      <div className="flex items-center gap-2">
        <select
          value={moveToProjectId}
          onChange={e => setMoveToProjectId(e.target.value)}
          className="border p-1 rounded"
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

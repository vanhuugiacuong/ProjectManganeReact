import { useContext, useState } from 'react';
import { ProjectsDispatchContext } from '../context/ProjectsContext';
import TaskList from './TaskList';
import { v4 as uuidv4 } from 'uuid';

function ProjectItem({ project }) {
  const dispatch = useContext(ProjectsDispatchContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(project.name);
  const [newTaskName, setNewTaskName] = useState('');

  const handleEdit = () => {
    if (editedName.trim() === '') return;
    dispatch({ type: 'EDIT_PROJECT', payload: { id: project.id, name: editedName } });
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (confirm('Bạn có chắc muốn xóa dự án này?')) {
      dispatch({ type: 'DELETE_PROJECT', payload: { id: project.id } });
    }
  };

  const handleAddTask = () => {
    if (newTaskName.trim() === '') return;
    const task = {
      id: uuidv4(),
      name: newTaskName,
      done: false,
    };
    dispatch({ type: 'ADD_TASK', payload: { projectId: project.id, task } });
    setNewTaskName('');
  };

  return (
    <div className="border rounded-2xl p-5 mb-6 shadow-md bg-white">
      <div className="flex items-center justify-between mb-4">
        {isEditing ? (
          <>
            <input
              className="border p-2 rounded mr-2"
              value={editedName}
              onChange={e => setEditedName(e.target.value)}
              placeholder="Sửa tên dự án"
            />
            <div className="flex gap-2">
              <button onClick={handleEdit} className="bg-blue-500 text-white px-3 py-1 rounded">Lưu</button>
              <button onClick={() => setIsEditing(false)} className="bg-gray-300 px-3 py-1 rounded">Hủy</button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold">{project.name}</h2>
            <div className="flex gap-2">
              <button onClick={() => setIsEditing(true)} className="bg-yellow-500 text-white px-3 py-1 rounded">Sửa</button>
              <button onClick={handleDelete} className="bg-red-500 text-white px-3 py-1 rounded">Xóa</button>
            </div>
          </>
        )}
      </div>

      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 flex-1 rounded"
          value={newTaskName}
          onChange={e => setNewTaskName(e.target.value)}
          placeholder="Thêm nhiệm vụ mới"
        />
        <button onClick={handleAddTask} className="bg-green-500 text-white px-4 py-2 rounded">
          Thêm
        </button>
      </div>

      <TaskList project={project} />
    </div>
  );
}

export default ProjectItem;

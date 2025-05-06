import { useContext } from 'react';
import { ProjectsContext } from '../context/ProjectsContext';
import TaskItem from './TaskItem';

function TaskList({ project }) {
  const allProjects = useContext(ProjectsContext);

  return (
    <ul className="space-y-2">
      {project.tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          projectId={project.id}
          allProjects={allProjects}
        />
      ))}
    </ul>
  );
}

export default TaskList;
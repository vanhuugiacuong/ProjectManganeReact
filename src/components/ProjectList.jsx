import { useContext } from "react";
import { ProjectsContext } from "../context/ProjectsContext";
import ProjectItem from "./ProjectItem";



function ProjectList() {
    const projects = useContext(ProjectsContext);
    const tasks = [];
    return (
        <div>
            {projects.map(project => (
                <ProjectItem key={project.id} project={project} />
            ))}
        </div>
        // <ul>     
        //     {tasks.map(task => (
        //     <TaskItem
        //         key={task.id}
        //         task={task}
        //         projectId={task.projectId}
        //         allProjects={[]} // Replace with your actual projects data
        //         setIsEditingTask={setIsEditingTask}
        //     />
        // ))}
        // </ul>
    );
}

export default ProjectList;
import { useContext } from "react";
import { ProjectsContext } from "../context/ProjectsContext";
import ProjectItem from "./ProjectItem";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import SortableProjectItem from './SortableProjectItem';


function ProjectList() {
    const projects = useContext(ProjectsContext);
    return (
        <div>
            {projects.map(project => (
                <ProjectItem key={project.id} project={project} />
            ))}
        </div>
    );
}

// function ProjectList({ projects = [], setProjects }) {
//     const sensors = useSensors(
//         useSensor(PointerSensor),
//         useSensor(KeyboardSensor, {
//             coordinateGetter: sortableKeyboardCoordinates,
//         })
//     );

//     const handleDragEnd = (event) => {
//         const { active, over } = event;

//         if (active.id !== over?.id) {
//             const oldIndex = projects.findIndex(p => p.id === active.id);
//             const newIndex = projects.findIndex(p => p.id === over.id);

//             const newProjects = arrayMove(projects, oldIndex, newIndex);
//             setProjects(newProjects); // hoặc dispatch action nếu bạn dùng reducer
//         }
//     };

//     return (
//         <DndContext
//             sensors={sensors}
//             collisionDetection={closestCenter}
//             onDragEnd={handleDragEnd}
//         >
//             <SortableContext
//                 items={projects.map(p => p.id)}
//                 strategy={verticalListSortingStrategy}
//             >
//                 <div className="flex text-center space-y-4 flex-col">
//                     {projects.length > 0 ? (
//                         projects.map(project => (
//                             <SortableProjectItem key={project.id} id={project.id} project={project} />
//                         ))
//                     ) : (
//                         <p className="flex text-center">No projects available</p>
//                     )}
//                 </div>
//             </SortableContext>
//         </DndContext>
//     );
// }

export default ProjectList;
import { projectsReducer, initialProjects } from "../reducers/projectsReducer";
import { ProjectsContext, ProjectsDispatchContext } from "./ProjectsContext";
import { useReducer } from "react";

export function ProjectsProvider({ children }) {
    const [projects, dispatch] = useReducer(projectsReducer, initialProjects);

    return (
        <ProjectsContext.Provider value={projects}>
            <ProjectsDispatchContext.Provider value={dispatch}>
                {children}
            </ProjectsDispatchContext.Provider>
        </ProjectsContext.Provider>
    );
}
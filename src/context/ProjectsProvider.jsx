import { projectsReducer, initialProjects } from "../reducers/projectsReducer";
import { ProjectsContext, ProjectsDispatchContext } from "./ProjectsContext";
import { useReducer, useEffect } from "react";
import React from "react";


export function ProjectsProvider({ children }) {
    // Khởi tạo trạng thái từ Local Storage hoặc mảng rỗng
    const [projects, dispatch] = useReducer(projectsReducer, [], () => {
        const storedProjects = localStorage.getItem("projects");
        return storedProjects ? JSON.parse(storedProjects) : [];
    });

    // Load projects from localStorage when the component mounts
    useEffect(() => {
        localStorage.setItem("projects", JSON.stringify(projects));
    }, [projects]);

    return (
        <ProjectsContext.Provider value={projects}>
            <ProjectsDispatchContext.Provider value={dispatch}>
                {children}
            </ProjectsDispatchContext.Provider>
        </ProjectsContext.Provider>
    );
}
import { useContext, useState } from "react";
import { ProjectsDispatchContext } from "../context/ProjectsContext";
import { v4 as uuidv4 } from 'uuid';

function AddProject() {
    const dispatch = useContext(ProjectsDispatchContext);
    const [name, setProjectName] = useState("");

    const handleAdd = () => {
        if (!name) return;
        dispatch({ type: 'ADD_PROJECT', payload: { id: uuidv4(), name, tasks: [] } });
        setProjectName('');
    }

    return (
        <div className="flex items-center gap-3 mb-4  p-3 rounded-lg ">
            <input className="" value={name} onChange={e => setProjectName(e.target.value)} placeholder="Tên dự án" />
            <button className="px-4 rounded bg-gray-400" onClick={handleAdd}>Thêm dự án</button> 
        </div>
    )
}

export default AddProject;
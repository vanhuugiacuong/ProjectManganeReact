import { useContext, useState } from "react";
import { ProjectsDispatchContext } from "../context/ProjectsContext";
import { v4 as uuidv4 } from 'uuid';
import { Button, Input, TextField } from "@mui/material";

function AddProject() {
    const dispatch = useContext(ProjectsDispatchContext);
    const [name, setProjectName] = useState("");

    // const handleAdd = () => {
    //     if (!name) return;
    //     dispatch({ type: 'ADD_PROJECT', payload: { id: uuidv4(), name, tasks: [] } });
    //     setProjectName('');
    // }

    const handleAdd = () => {
        if (!name.trim()) return;
        dispatch({
            type: 'ADD_PROJECT',
            payload: { id: uuidv4(), name, tasks: [] }
        });
        setProjectName('');
    };

    return (
        <div className="flex text items-center gap-3 mb-4  p-3 rounded-lg ">
            <Input color="info" value={name} onChange={e => setProjectName(e.target.value)} placeholder="Tên dự án" />
            <Button variant="contained" className="px-4 rounded bg-gray-400" onClick={handleAdd}>Thêm dự án</Button>
        </div>
    )
}

export default AddProject;
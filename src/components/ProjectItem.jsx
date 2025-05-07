import { useContext, useState } from 'react';
import { ProjectsDispatchContext } from '../context/ProjectsContext';
import TaskList from './TaskList';
import { v4 as uuidv4 } from 'uuid';
import { Box, Button, Card, CardContent, TextField, Typography } from '@mui/material';

function ProjectItem({ project }) {
  const dispatch = useContext(ProjectsDispatchContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(project.name);
  const [newTaskName, setNewTaskName] = useState('');
  const [isEditingTask, setIsEditingTask] = useState(false);

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
    <Card
      sx={{
        mb: 3,
        boxShadow: 3,
        borderRadius: 2,
        border: isEditingTask ? '2px solid #1976d2' : '1px solid #e0e0e0',
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          {isEditing ? (
            <>
              <TextField
                value={editedName}
                onChange={e => setEditedName(e.target.value)}
                placeholder="Sửa tên dự án"
                variant="outlined"
                size="small"
                sx={{ flex: 1, mr: 2 }}
              />
              <Box display="flex" gap={1}>
                <Button onClick={handleEdit} variant="contained" color="primary" size="small">
                  Lưu
                </Button>
                <Button onClick={() => setIsEditing(false)} variant="outlined" color="secondary" size="small">
                  Hủy
                </Button>
              </Box>
            </>
          ) : (
            <>
              <Typography variant="h6" fontWeight="bold">
                {project.name}
              </Typography>
              <Box display="flex" gap={1}>
                <Button onClick={() => setIsEditing(true)} variant="outlined" color="warning" size="small">
                  Sửa
                </Button>
                <Button onClick={handleDelete} variant="contained" color="error" size="small">
                  Xóa
                </Button>
              </Box>
            </>
          )}
        </Box>

        <Box display="flex" gap={2} mb={2}>
          <TextField
            value={newTaskName}
            onChange={e => setNewTaskName(e.target.value)}
            placeholder="Thêm nhiệm vụ mới"
            variant="outlined"
            size="small"
            fullWidth
          />
          <Button onClick={handleAddTask} variant="contained" color="success" size="small">
            Thêm
          </Button>
        </Box>

        <TaskList project={project} setIsEditingTask={setIsEditingTask} />
      </CardContent>
    </Card>
  );
}

export default ProjectItem;

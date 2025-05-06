export const initialProjects = [];

export function projectsReducer(state, action) {
    switch (action.type) {

        case 'ADD_PROJECT':
            return [...state, action.payload];
        case 'EDIT_PROJECT':
            return state.map(p => p.id === action.payload.id ? { ...p, name: action.payload.name } : p);
        case 'DELETE_PROJECT':
            return state.filter(p => p.id !== action.payload.id);
        case 'ADD_TASK':
            return state.map(p => p.id === action.payload.projectId
                ? { ...p, tasks: [...p.tasks, action.payload.task] }
                : p);
        case 'EDIT_TASK':
            return state.map(p => p.id === action.payload.projectId
                ? {
                    ...p,
                    tasks: p.tasks.map(t =>
                        t.id === action.payload.taskId ? { ...t, name: action.payload.name } : t
                    ),
                }
                : p);
        case 'TOGGLE_TASK':
            return state.map(p => p.id === action.payload.projectId
                ? {
                    ...p,
                    tasks: p.tasks.map(t =>
                        t.id === action.payload.taskId ? { ...t, done: !t.done } : t
                    ),
                }
                : p);
        case 'DELETE_TASK':
            return state.map(p => p.id === action.payload.projectId
                ? {
                    ...p,
                    tasks: p.tasks.filter(t => t.id !== action.payload.taskId),
                }
                : p);
        case 'MOVE_TASK_BETWEEN_PROJECTS':
            const { fromId, toId, taskId } = action.payload;
            const fromProject = state.find(p => p.id === fromId);
            const toProject = state.find(p => p.id === toId);


            // Kiểm tra nếu fromProject không tồn tại
            if (!fromProject) {
                console.error(`Project with id ${fromId} not found.`);
                return state;
            }

            // Kiểm tra nếu fromProject không có tasks
            if (!fromProject.tasks) {
                console.error(`Project with id ${fromId} has no tasks.`);
                return state;
            }

            // Tìm task cần di chuyển
            const taskToMove = fromProject.tasks.find(t => t.id === taskId);
            if (!taskToMove) {
                console.error(`Task with id ${taskId} not found in project ${fromId}.`);
                return state;
            }

            // Kiểm tra nếu toProject không tồn tại
            if (!toProject) {
                console.error(`Project with id ${toId} not found.`);
                return state;
            }

            // Cập nhật state bằng cách di chuyển task
            return state.map(p => {
                if (p.id === fromId) {
                    // Loại bỏ task khỏi dự án nguồn
                    return { ...p, tasks: p.tasks.filter(t => t.id !== taskId) };
                }
                if (p.id === toId) {
                    // Thêm task vào dự án đích
                    return { ...p, tasks: [...p.tasks, taskToMove] };
                }
                return p; // Các dự án khác không thay đổi
            });
        case 'REORDER_PROJECTS':
            return action.payload;
        default:
            return state;
    }
}
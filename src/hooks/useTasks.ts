import { useContext } from "react";
import { TaskContext, Task } from "../contexts/TaskContext";

const useTasks = () => {
    const { tasks, setTasks } = useContext(TaskContext);

    const addTask = (task: Task) => {
        setTasks((tasks) => {
            const newTask = { ...task, id: Date.now().toString() };
            const allTasks = [...tasks, newTask];
            localStorage.setItem('tasks', JSON.stringify(allTasks));
            
            return allTasks;
        });
    };

    const removeTask = (taskId: string) => {
        setTasks((tasks) => {
            const updatedTasks = tasks.filter(task => task.id !== taskId);
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
            return updatedTasks;
        });
    };

    const updateTask = (taskToUpdate: Task) => {
        setTasks((tasks) => {
            const updatedTasks = tasks.map(task => task.id === taskToUpdate.id ? taskToUpdate : task);
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
            return updatedTasks;
        });
    };

    const sortFn = (t1: Task, t2: Task, sortOrder: 'asc' | 'desc' = 'asc') => {
        const date1 = new Date(`${t1.date}T${t1.time ?? '00:00'}`);
        const date2 = new Date(`${t2.date}T${t2.time ?? '00:00'}`);

        if (sortOrder === 'asc') return date1.valueOf() - date2.valueOf();

        return date2.valueOf() - date1.valueOf();
    };

    const isTaskToBeCompletedToday = (task: Task) => {
        const formattedDate = new Date().toLocaleDateString('en-CA');

        if (formattedDate !== task.date) return false;

        if (!task.time) return true;

        const [hours, minutes] = task.time.split(':').map(Number);

        if (hours < new Date().getHours()) return false;

        return minutes !== new Date().getMinutes();
    };

    const isTaskArchived = (task: Task): boolean => {
        const currentTimeStamp = new Date().getTime();
        const taskTimeStamp = new Date(`${task.date}T${task.time?.trim() ?? '23:59'}`).getTime();

        return currentTimeStamp > taskTimeStamp;
    };

    const getTasksForToday = () => {
        return tasks
            .filter((task) => isTaskToBeCompletedToday(task))
            .sort(sortFn);
    };

    const getArchivedTasks = () => {
        return tasks.filter((task) => isTaskArchived(task))
        .sort(sortFn);
    }

    const getAllTasks = () => {
        return tasks.sort(sortFn);
    }

    return { tasks, addTask, removeTask, updateTask, getAllTasks, getTasksForToday, getArchivedTasks };
};

export default useTasks;

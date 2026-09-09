import { createContext, useState } from "react";

export interface Task {
    id: string;
    title: string;
    date: string;
    time?: string;
    note?: string;
}
interface TaskContextType {
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>
}

export const TaskContext = createContext<TaskContextType>({} as TaskContextType);

const TaskProvider = ({ children }: { children: React.ReactNode }) => {
    const storedTasks = localStorage.getItem('tasks');
    const [tasks, setTasks] = useState<Task[]>(
        storedTasks ? JSON.parse(storedTasks) : []
    );

    return (
        <TaskContext.Provider value={{ tasks, setTasks }}>
            {children}
        </TaskContext.Provider>
    )
};

export default TaskProvider;

import { useEffect, useRef } from "react";
import { Task } from "../contexts/TaskContext";
import { Permission } from "./useNotification";

const useTaskNotifier = (
    tasks: Task[],
    permission: Permission,
    fireNotification: (title: string, body: string) => void
) => {
  const notifiedTasks = useRef(new Set());

  useEffect(() => {
    if (permission !== 'granted' || !tasks || tasks.length === 0) return;

    const timeoutIds: any[] = [];

    tasks.forEach((task) => {
      // Skip if we already sent this notification
      if (notifiedTasks.current.has(task.id)) return;

      const taskTime = new Date(`${task.date}T${task.time ?? '00:00'}`).getTime();
      const currentTime = Date.now();
      const timeUntilTask = taskTime - currentTime;

      if (timeUntilTask > 0) {
        const timeoutId = setTimeout(() => {
          fireNotification(
            `Task Due: ${task.title}`,
            task.note || 'It is time to complete your task!'
          );
          
          // Mark as notified
          notifiedTasks.current.add(task.id);
        }, timeUntilTask);

        timeoutIds.push(timeoutId);
      }
    });
    return () => {
      timeoutIds.forEach((id) => clearTimeout(id));
    };
  }, [tasks, permission, fireNotification]);
}
export default useTaskNotifier;

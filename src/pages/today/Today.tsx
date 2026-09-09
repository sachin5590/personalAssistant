import { useMemo, useState } from 'react';
import CreateNewTaskModal from '../../components/createNewTaskModal/CreateNewTaskModal';
import useTasks from '../../hooks/useTasks';
import commonStyles from '../../common.module.css';
import { Task } from '../../contexts/TaskContext';
import useNotification from '../../hooks/useNotification';
import TaskList from '../../components/taskList/TaskList';
import useTaskNotifier from '../../hooks/useTaskNotifier';

const Today = () => {
    const {
        tasks: currentTasks,
        addTask,
        getTasksForToday
    } = useTasks();

    const {
        permission, fireNotification, requestPermission
    } = useNotification();

    const [openAddTaskModal, setOpenAddTaskModal] = useState(false);

    const tasks = useMemo(() => {
        return getTasksForToday()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentTasks]);
    useTaskNotifier(tasks, permission, fireNotification);

    if (['default', 'denied'].includes(permission)) {
        requestPermission();
    }
    console.log('tasks: ', tasks);

    return (
        <div className={commonStyles.page}>
            <div className={commonStyles.card}>
                <span className={commonStyles.title}>Today</span>
                <button type="button" className={commonStyles.primaryButton} onClick={() => setOpenAddTaskModal(true)}>
                    + Add Task
                </button>
            </div>

            {openAddTaskModal &&
                <CreateNewTaskModal
                    handleClose={() => setOpenAddTaskModal(false)}
                    handleSubmit={(task: Task) => {
                        addTask(task);
                        setOpenAddTaskModal(false);
                    }}
                />
            }

            <div className={commonStyles['task-list']}>
                {tasks.length === 0 ? (
                    <p className={commonStyles['toast-error']}>No tasks for today. Add a new task!</p>
                ) : (
                    <>
                        {permission === 'granted' ? (
                            <div className={commonStyles['toast-success']}>
                                ✓ Notifications are active. Keep this tab open to get notification (Tab in background is fine).
                            </div>
                        ) : (
                            <div className={commonStyles['toast-error']}>
                                ✗ Notifications are disabled. You can enable it from settings.
                            </div>
                        )}
                        <TaskList tasks={tasks} />
                    </>
                )}
            </div>
        </div>
    );
};

export default Today;

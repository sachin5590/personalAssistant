import { useMemo, useState } from 'react';
import commonStyles from '../../common.module.css';
import CreateNewTaskModal from '../../components/createNewTaskModal/CreateNewTaskModal';
import useTasks from '../../hooks/useTasks';
import { Task } from '../../contexts/TaskContext';
import TaskList from '../../components/taskList/TaskList';

const AllTasks = () => {
    const {
        tasks: currentTasks,
        getAllTasks,
        addTask,
    } = useTasks();

    const [openAddTaskModal, setOpenAddTaskModal] = useState(false);

    const tasks = useMemo(() => {
        return getAllTasks()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentTasks]);

    return (
        <div className={commonStyles.page}>
            <div className={commonStyles.card}>
                <span className={commonStyles.title}>All Tasks</span>
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
                    <p className={commonStyles['no-tasks']}>No tasks. Add a new task!</p>
                ) : (
                    <TaskList tasks={tasks} />
                )}
            </div>
        </div>
    );
};

export default AllTasks;

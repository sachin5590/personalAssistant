import commonStyles from '../../common.module.css';
import TaskList from '../../components/taskList/TaskList';
import useTasks from '../../hooks/useTasks';

const Archive = () => {
    const {
        getArchivedTasks
    } = useTasks();

    const tasks = getArchivedTasks();

    return (
        <div className={commonStyles.page}>
            <div className={commonStyles.card}>
                <span className={commonStyles.title}>Archive</span>
            </div>

            <div className={commonStyles['task-list']}>
                {tasks.length === 0 ? (
                    <p className={commonStyles['no-tasks']}>No archived tasks!</p>
                ) : (
                    <TaskList tasks={tasks} />
                )}
            </div>
            
        </div>
    );
};

export default Archive;

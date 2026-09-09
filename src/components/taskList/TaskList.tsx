import { useState } from "react";
import { Task } from "../../contexts/TaskContext";
import commonStyles from "../../common.module.css";
import useTasks from "../../hooks/useTasks";
import DeleteIcon from "../../svgs/delete";
import EditIcon from "../../svgs/Edit";
import CreateNewTaskModal from "../createNewTaskModal/CreateNewTaskModal";

const TaskList = ({
    tasks
}: {
    tasks: Task[]
}) => {
    const [taskToUpdate, setTaskToUpdate] = useState<Task | null>(null);

    const {
        updateTask,
        removeTask
    } = useTasks();

    return (
        <>
            
            {!!taskToUpdate &&
                <CreateNewTaskModal
                    values={taskToUpdate}
                    handleClose={() => setTaskToUpdate(null)}
                    handleSubmit={(task: Task) => {
                        console.log('task: ', task);
                        setTaskToUpdate(null);
                        updateTask(task);
                    }}
                />
            }
            {tasks.map((task) => (
                <div key={task.id} className={commonStyles.task}>
                    <div className={commonStyles['task-item']}>
                        <h3 className={commonStyles['task-title']}>{task.title}</h3>
                        <div style={{ minWidth: '110px' }}>
                            <p>{task.date} {task.time && ` ${task.time}`}</p>
                        </div>
                    </div>
                    <div className={commonStyles['task-item']}>
                        <div>
                            {task.note && <pre>{task.note}</pre>}
                        </div>
                        <div style={{ minWidth: '110px' }}>
                            <span
                                style={{ marginRight: '10px' }}
                                onClick={() => {
                                    setTaskToUpdate(task);
                                }}
                            >
                                <EditIcon classes={commonStyles.editIcon} />
                            </span>
                            <span onClick={() => removeTask(task.id)}>
                                <DeleteIcon classes={commonStyles.deleteIcon} />
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
};
export default TaskList;

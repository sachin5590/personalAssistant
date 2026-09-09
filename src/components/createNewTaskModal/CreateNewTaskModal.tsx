import { useState } from 'react';
import commonStyles from '../../common.module.css';
import Modal from '../../components/modal/Modal';
import { Task } from '../../contexts/TaskContext';

const CreateNewTaskModal = ({
    values,
    handleClose,
    handleSubmit
}: {
    values?: Task | null;
    handleClose: () => void;
    handleSubmit: (task: Task) => void;
}) => {
    const [task, setTask] = useState<Task>(values ?? {} as Task);

    return (
        <Modal
            title="Create New Task"
            submitButtonText="Save Task"
            onClose={handleClose}
            onSubmit={() => handleSubmit(task)}
            // TODO: Fix the disabled prop to be dynamic based on form validation
            disabled={false}
        >
            <form>
                <div className={commonStyles['form-group']}>
                    <label className={commonStyles['form-label']}>Task Title</label>
                    <input
                        required
                        autoFocus
                        type="text"
                        value={task.title}
                        onChange={(e) => setTask({ ...task, title: e.target.value })}
                        className={commonStyles['form-input']}
                        placeholder="What needs to be done?"
                    />
                </div>

                <div className={commonStyles['input-row']}>
                    <div className={commonStyles['form-group']}>
                        <label className={commonStyles['form-label']}>Date</label>
                        <input
                            required
                            type="date"
                            value={task.date}
                            className={commonStyles['form-input']}
                            onChange={(e) => setTask({ ...task, date: e.target.value })}
                        />
                    </div>
                    <div className={commonStyles['form-group']}>
                        <label className={commonStyles['form-label']}>Time</label>
                        <input
                            type="time"
                            value={task.time}
                            className={commonStyles['form-input']}
                            onChange={(e) => setTask({ ...task, time: e.target.value })}
                        />
                    </div>
                </div>

                <div className={commonStyles['form-group']}>
                    <label className={commonStyles['form-label']}>Note (Optional)</label>
                    <textarea
                        rows={3}
                        value={task.note}
                        className={commonStyles['form-input']}
                        placeholder="Add any extra details..."
                        onChange={(e) => setTask({ ...task, note: e.target.value })}
                    ></textarea>
                </div>
            </form>
        </Modal>
    );
};

export default CreateNewTaskModal;

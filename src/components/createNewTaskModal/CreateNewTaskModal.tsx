import { useState } from 'react';
import Modal from '../../components/modal/Modal';
import { ChecklistType, Task } from '../../contexts/TaskContext';
import commonStyles from '../../common.module.css';
import Checklists from './Checklists';

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
    const [checklists, setChecklists] = useState<Array<ChecklistType>>(values?.checklists ?? []);

    return (
        <>
            <Modal
                title="Create New Task"
                submitButtonText="Save Task"
                onClose={handleClose}
                onSubmit={() => {
                    const taskToAdd = {
                        ...task,
                        checklists
                    };
                    handleSubmit(taskToAdd)
                }}
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

                    <div className={commonStyles['form-group']}>
                        <div className={commonStyles['form-label-container']}>
                            <label className={commonStyles['form-label']}>Checklist(s) (Optional)</label>
                            <button
                                type="button"
                                className={commonStyles.primaryButton}
                                onClick={() => setChecklists((checklists) => {
                                    const addedChecklists = [
                                        ...checklists,
                                        {
                                            title: '',
                                            value: false
                                        }
                                    ];
                                    return addedChecklists;
                                })}
                             >
                                + Add Checklist
                            </button>
                        </div>
                        <Checklists
                            checklists={checklists}
                            onSubmit={setChecklists}
                        />
                        {
                            // checklists.map((checklist, index) => {
                            //     return <div key={index} className={commonStyles['form-checklist']}>
                            //         <input
                            //             type="checkbox"
                            //             checked={checklist.value}
                            //             onChange={(e) => {
                            //                 const updatedChecklists = checklists.reduce((acc, current, currentIndex) => {
                            //                     if (index === currentIndex) {
                            //                         acc.push({
                            //                             title: current.title,
                            //                             value: e.target.checked
                            //                         })
                            //                     } else {
                            //                         acc.push(current);
                            //                     }
                            //                     return acc;
                            //                 }, [] as any);

                            //                 setChecklists(updatedChecklists);
                            //             }}

                            //         />
                            //         <input
                            //             required
                            //             type="text"
                            //             value={checklist.title}
                            //             onChange={(e) => {
                            //                 const updatedChecklists = checklists.reduce((acc, current, currentIndex) => {
                            //                     if (index === currentIndex) {
                            //                         acc.push({
                            //                             value: current.value,
                            //                             title: e.target.value
                            //                         })
                            //                     } else {
                            //                         acc.push(current);
                            //                     }
                            //                     return acc;
                            //                 }, [] as any);

                            //                 setChecklists(updatedChecklists);
                            //             }}
                            //             className={commonStyles['form-input']}
                            //             placeholder={`Checklist item ${index + 1}`}
                            //         />
                            //     </div>
                            // })
                        }
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default CreateNewTaskModal;

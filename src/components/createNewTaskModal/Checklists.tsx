import { useState } from "react";
import Modal from "../modal/Modal";
import commonStyles from '../../common.module.css';
import { ChecklistType } from "../../contexts/TaskContext";

const Checklists = ({
    checklists,
    onSubmit,
    showTitleAsLabel = false
}: {
    showTitleAsLabel?: boolean;
    checklists: Array<ChecklistType>;
    onSubmit: (checklists: Array<ChecklistType>) => void;
}) => {
    return (
        <>
            {checklists.map((checklist, index) => {
                return <div key={index} className={commonStyles['form-checklist']}>
                    <input
                        type="checkbox"
                        id={index.toString()}
                        checked={checklist.value}
                        onChange={(e) => {
                            const updatedChecklists = checklists.reduce((acc, current, currentIndex) => {
                                if (index === currentIndex) {
                                    acc.push({
                                        title: current.title,
                                        value: e.target.checked
                                    })
                                } else {
                                    acc.push(current);
                                }
                                return acc;
                            }, [] as any);

                            onSubmit(updatedChecklists);
                        }}
                    />
                    {showTitleAsLabel ? 
                        <label htmlFor={index.toString()}>{checklist.title}</label> :
                        <input
                            required
                            type="text"
                            value={checklist.title}
                            onChange={(e) => {
                                const updatedChecklists = checklists.reduce((acc, current, currentIndex) => {
                                    if (index === currentIndex) {
                                        acc.push({
                                            value: current.value,
                                            title: e.target.value
                                        })
                                    } else {
                                        acc.push(current);
                                    }
                                    return acc;
                                }, [] as any);

                                onSubmit(updatedChecklists);
                            }}
                            className={commonStyles['form-input']}
                            placeholder={`Checklist item ${index + 1}`}
                        />
                        
                    }
                </div>
            })}
        </>
    )
};

export default Checklists;

import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ProLogo from '../../Assets/ProLogo.svg'
import styles from './ShareTask.module.css'
import Blue from '../../Assets/Blue.svg'
import Green from '../../Assets/Green.svg'
import Pink from '../../Assets/Pink.svg'
import { getTaskById } from '../../API/Task'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

function ShareTask() {
    const { taskId } = useParams();
    console.log(taskId)
    const [taskData, setTaskData] = useState(null);
    const [selectedItems, setSelectedItems] = useState([]);
    const handleItemClick = (item) => {
        if (selectedItems.includes(item)) {
            setSelectedItems(selectedItems.filter(i => i !== item));
        } else {
            setSelectedItems([...selectedItems, item]);
        }
    };

    const fetchTaskById = async (requiredId) => {
        if (!requiredId) return console.log("Task id not found");
        const response = await getTaskById(requiredId);
        setTaskData(response.data);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString('en-US', { month: 'short' });

        const getOrdinalSuffix = (day) => {
            if (day > 3 && day < 21) return 'th';
            switch (day % 10) {
                case 1: return 'st';
                case 2: return 'nd';
                case 3: return 'rd';
                default: return 'th';
            }
        };

        return `${month} ${day}${getOrdinalSuffix(day)}`;
    };

    useEffect(() => {
        fetchTaskById(taskId);
    });
    console.log(taskData)

    const getPriorityImage = () => {
        switch (taskData.priority) {
            case 'moderate priority':
                return Blue;
            case 'high priority':
                return Pink;
            case 'low priority':
                return Green;
            default:
                return null;
        }
    };


    return (
        <div className={`${styles.body}`} >

            <div className={`${styles.header} container-fluid `} >
                <img src={ProLogo} className={`${styles.prologo} img img-fluid`} />
                <p className={`${styles.protext} fs-1 `} >Pro Manage</p>
            </div>

            <div className={`${styles.container} container-fluid  col-xs-8 col-sm-6 col-md-6 col-lg-6`} >

                {taskData && (
                    <div>

                        <div className={`${styles.imagecontainer} `}>
                            {taskData.priority === 'high priority' && (
                                <img src={getPriorityImage()} className={`${styles.priorityImage}`} alt="PriorityImage" />
                            )}

                            {taskData.priority === 'moderate priority' && (
                                <img src={getPriorityImage()} className={`${styles.priorityImage}`} alt="PriorityImage" />
                            )}

                            {taskData.priority === 'low priority' && (
                                <img src={getPriorityImage()} className={`${styles.priorityImage}`} alt="PriorityImage" />
                            )}


                            <p className={`${styles.prioritytext} fs-6 `}> {taskData.priority}</p>
                        </div>

                        <div className={`${styles.titlecontainer}`} >
                            <p className={`${styles.datatitle} fs-3`} >{taskData.title}</p>
                        </div>
                        <p className={`${styles.checked} fs-6`} >Checklist ({taskData.checklist.filter(item => item.checked).length}/{taskData.checklist.length})</p>
                        <div className={`${styles.checklistInputarea}`} >
                            <div className={`${styles.checklistInput} `}>
                                {taskData.checklist.map((item, idx) => (
                                    <label key={idx} className={`${styles.radioLabel}`}>
                                        <div className={`${styles.wanted}`} >
                                            <input
                                                type="checkbox"
                                                className={`${styles.boxes}`}
                                                checked={item.checked}
                                                readOnly
                                            />
                                            <div className={`${styles.inputvalues}`}>{item.item}</div>
                                        </div>
                                    </label>
                                ))}

                            </div>
                        </div>

                        {taskData.date && (
                            <div className={`${styles.datearea}`}>
                                <p className={`${styles.due}`}> Due Date</p>
                                <button className={`${styles.actiondate}`}>{formatDate(taskData.date)}</button>
                            </div>
                        )}
                    </div>
                )}

            </div>


        </div>
    )
}

export default ShareTask
import clsx from 'clsx';
import React, { useEffect, useState, useRef } from 'react'
import { PropTypes } from 'prop-types'
import styles from './jobDayList.module.css'
import axios from 'axios';
import dayApi from '../../../api/dayAPI';


JobDayList.propTypes = {
    listDay: PropTypes.array,
    handleDay: PropTypes.func,
    handleJob: PropTypes.func    
};

JobDayList.defaultProps = {
};

function JobDayList(props) {

    const [dayList, setDayList] = useState([])

    useEffect(() => {
        const fetchDayList = async () => {
            try {
                const response = await dayApi.getAll()
                console.log(response)
                const arr = [];
                for (let i of response) {
                if (!arr.includes(i.joB_IN_DAY)) {
                    arr.push(i.joB_IN_DAY);
                }
                }

                const result = [];
                for (let i of arr) {
                const input = [];
                for (let x of response) {
                    if (x.joB_IN_DAY === i) {
                    input.push(x.job);
                    }
                }
                result.push({ title: i, listJob: input });
                }
                setDayList(result)
            } catch (error) {
                console.log('Fail to fetch product list: ', error)
            }
        }
        fetchDayList();
    }, [])
    
    const {listDay, handleDay, handleJob} = props

    const [jobActive, setJobActive] = useState("")
    const [openEdit, setOpenEdit] = useState("")

    const inputJobRef = useRef()

    const handleClickJob = (data) => {
        handleJob(data)
    }

    const handleClickDay = (data) => {
        handleDay(data)
    }


    return (
        <div className={styles.listDay}>
            {dayList.map((day, index) => (
                <div key={index} className={clsx(styles.day)}>
                    
                        <div className={styles.headingDay}>
                            <p>{day.title}</p>
                            <div className={styles.optionContainer}>
                                <div 
                                    className={clsx(styles.optionBtn, index === jobActive ? styles.active : "")}
                                >
                                    <i 
                                        className={clsx("fas fa-bars", styles.barBtn)}
                                        onClick={() => setJobActive(index)}

                                    ></i>
                                    <i 
                                        className={clsx("fa-solid fa-xmark", styles.closeBtn)}
                                        onClick={() => {
                                            setJobActive("")
                                            setOpenEdit("")
                                        }}
                                    ></i>

                                </div>
                                <div className={clsx(styles.option, "option")}>
                                    <div 
                                        className={styles.editDay}
                                        onClick={() => setOpenEdit(index)}
                                    >
                                        <i className="fas fa-pen"></i>

                                    </div>
                                    <div
                                        onClick={() => {
                                            const data = {
                                                type: "REMOVE_DAY",
                                                idDay: index
                                            }
                                            setJobActive("")
                                            handleClickDay(data)}} 
                                        className={styles.removeDay}
                                    >
                                        <i className="fa-solid fa-trash-can"></i>
                                    </div>
                                </div>
                            </div>

                        </div>
                        
                        <ul className={styles.listJob}>
                            {day.listJob.map((job, id) => (
                                <li 
                                    key={id}
                                    className={styles.job}
                                >
                                    {job}
                                    <span 
                                        className={clsx(styles.removeJob, openEdit === index ? styles.active : "")}
                                        onClick={() => {
                                            const data = {
                                                type: "REMOVE_JOB",
                                                idDay: index,
                                                idJob: id
                                            }
                                            handleClickJob(data)}}
                                    >&times;
                                    </span>
                                </li>
                            ))}
                        </ul>
                        <div className={styles.footerDay}>
                            <input
                                ref={inputJobRef} 
                                value={day.inputJob}
                                className={styles.inputJob}
                                type="text"
                                placeholder="..."
                                onChange={e => {
                                    const data = {
                                        type: "SET_INPUT_JOB",
                                        idDay: index,
                                        inputJob: e.target.value
                                    }
                                    handleClickJob(data)
                                }}
                            />
                            <div
                                className={styles.jobBtn}
                                onClick={() => {
                                const data = {
                                    type: "ADD_JOB",
                                    idDay: index,
                                    valueJob: day.inputJob,
                                    inputJob: ""
                                }
                                if (data.valueJob.trim() !== "") {
                                    handleClickJob(data)
                                    inputJobRef.current.focus()
                                }
                                }}
                            >
                                <i className="fal fa-plus"></i>
                            </div>
                        </div>
                   
                    
                </div>
            ))}
        </div>
    )
}
export default JobDayList
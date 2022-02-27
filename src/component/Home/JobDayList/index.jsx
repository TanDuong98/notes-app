import clsx from 'clsx';
import React, { useEffect, useState, useRef } from 'react'
import { PropTypes } from 'prop-types'
import styles from './jobDayList.module.css'


JobDayList.propTypes = {
    listDay: PropTypes.array,
    handleDay: PropTypes.func,
    handleJob: PropTypes.func    
};

JobDayList.defaultProps = {
};

function JobDayList(props) {
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
            {listDay.map((day, index) => (
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
import React from "react";
import { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import JobDayList from "../component/Home/JobDayList";
import { setInputDay, addDay , setInputJob, addJob, removeJob, removeDay} from '../action/jobDay.js'
import styles from './homePage.module.css'



function HomePage() {
    const inputDay = useSelector(state => state.jobDayReducer.inputDay)
    const listDay = useSelector(state => state.jobDayReducer.listDay)
    // const listDay = useSelector(state => state.jobDayReducer.listDay)

    
    const dispatch = useDispatch()
    
    const handleDay = (data) => {
        switch (data.type) {
            case "SET_INPUT_DAY":
                dispatch(setInputDay(data))
                break
            case "ADD_DAY":
                dispatch(addDay(data))
                dispatch(setInputDay(data))
                break
            case "REMOVE_DAY":
                dispatch(removeDay(data))
                break
            default:
                console.log("Invalid")
        } 
    }

    const handleJob = (data) => {
        switch (data.type) {
            case "SET_INPUT_JOB":
                dispatch(setInputJob(data))
                break
            case "ADD_JOB":
                dispatch(addJob(data))
                dispatch(setInputJob(data))
                break
            case "REMOVE_JOB":
                dispatch(removeJob(data))
                break
            default:
                console.log("Invalid")
        }
    //    console.log(data)
    }

    return (
        <div className={styles.container}>
            <div className={styles.containerInput}>

                <input 
                    value={inputDay}
                    className={styles.inputDay}
                    placeholder="Enter day ..."
                    type="text"
                    onChange={(e) => {
                        const data = {
                            type: "SET_INPUT_DAY",
                            inputDay: e.target.value
                        }
                        handleDay(data)
                    }}
                />
                <button 
                    className={styles.dayBtn}
                    onClick={() => {
                        const data = {
                            type: "ADD_DAY",
                            valueDay: inputDay,
                            inputDay: ""
                        }
                        if (data.valueDay.trim() !== "") handleDay(data)
                    }}
                >
                    Add
                </button>
            </div>
            <JobDayList
                listDay={listDay}
                handleDay={handleDay}
                handleJob={handleJob}
            />
        </div>
    )
}

export default HomePage
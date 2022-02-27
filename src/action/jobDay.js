// Action day --------------------
export const setInputDay = (payload) => {
    return {
        type: "SET_INPUT_DAY",
        payload: payload
    }
}

export const addDay = (payload) => {
    return {
        type: "ADD_DAY",
        payload: payload
    }
}

export const removeDay = (payload) => {
    return {
        type: "REMOVE_DAY",
        payload: payload
    }
}



// Action job ------------------------------
export const setInputJob = (payload) => {
    return {
        type: "SET_INPUT_JOB",
        payload: payload
    }
}

export const addJob = (payload) => {
    return {
        type: "ADD_JOB",
        payload: payload
    }
}

export const removeJob = (payload) => {
    return {
        type: "REMOVE_JOB",
        payload: payload
    }
}


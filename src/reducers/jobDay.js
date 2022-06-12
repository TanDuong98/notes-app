const initialState = {
  inputDay: "",
  listDay: [],
};

const jobDayReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_INPUT_DAY":
      return {
        ...state,
        inputDay: action.payload.inputDay,
      };
    case "ADD_DAY":
      const newAddDay = [...state.listDay];
      const newDay = {
        title: action.payload.valueDay,
        inputJob: "",
        listJob: [],
      };
      newAddDay.push(newDay);

      return {
        ...state,
        listDay: newAddDay,
      };
    case "REMOVE_DAY":
      const newRemoveDay = [...state.listDay];
      newRemoveDay.splice(action.payload.idDay, 1);
      return {
        ...state,
        listDay: newRemoveDay,
      };

    // Action job in day
    case "SET_INPUT_JOB":
      const newSetInputJob = [...state.listDay];
      newSetInputJob[action.payload.idDay].inputJob = action.payload.inputJob;

      return {
        ...state,
        listDay: newSetInputJob,
      };

    case "ADD_JOB":
      const newAddJob = [...state.listDay];
      newAddJob[action.payload.idDay].listJob.push(action.payload.valueJob);
      return {
        ...state,
        listDay: newAddJob,
      };
    case "REMOVE_JOB":
      const newRemoveJob = [...state.listDay];
      newRemoveJob[action.payload.idDay].listJob.splice(
        action.payload.idJob,
        1
      );
      return {
        ...state,
        listDay: newRemoveJob,
      };

    default:
      return state;
  }
};

export default jobDayReducer;

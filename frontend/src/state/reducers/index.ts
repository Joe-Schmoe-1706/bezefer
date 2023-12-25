import { combineReducers } from "redux";
import { addReducer, deleteReducer, numberOfSeatsReducer } from "./classroomReducers";

const reducers = combineReducers({
    add: addReducer,
    delete: deleteReducer,
    numberOfSeats: numberOfSeatsReducer
});

export default reducers;
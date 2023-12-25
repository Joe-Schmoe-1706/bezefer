import { Classroom } from "../../Types/types";
import { AddAction, ChangeSeatsAction, DeleteAction } from "../action.types";
import { Type } from "../action.types.enum";

const initialState: Classroom[] = [];

const addReducer = (state: Classroom[], action: AddAction) => {
    return state.push(action.payload.classroom);
}

const deleteReducer = (state: Classroom[], action: DeleteAction) => {
    return state.filter(classroom => classroom._id !== action.payload.id);
};

const numberOfSeatsReducer = (state: Classroom[], action: ChangeSeatsAction) => {
    switch (action.type) {
        case Type.ADD: {
            return state.map((classroom) => {
                return classroom._id === action.payload.id ?
                {
                    ...classroom,
                    numberOfSeatsLeft: classroom.numberOfSeatsLeft - action.payload.change
                } : 
                classroom
            });
        }
        case Type.REMOVE: {
            return state.map((classroom) => {
                return classroom._id === action.payload.id ?
                {
                    ...classroom,
                    numberOfSeatsLeft: classroom.numberOfSeatsLeft + action.payload.change
                } : 
                classroom
            });
        }
        default: {
            return state
        }
    }
};

export {
    addReducer,
    deleteReducer,
    numberOfSeatsReducer
};
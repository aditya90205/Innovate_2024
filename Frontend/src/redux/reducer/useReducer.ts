import {createSlice} from "@reduxjs/toolkit";
import { userReducerInitialState } from "../../types/reducer-types";


const initialState:userReducerInitialState = {
    user: null,
    loading: true
};

export const userReducer = createSlice({
    name: "userReducer",
    initialState,
    reducers:{
         userExist: (state, action) => {
            state.loading = false;
            state.user = action.payload;
         },

         userNotExist: (state) => {
            state.loading = false,
            state.user = null;
         }
    },
});

export const {userExist, userNotExist} = userReducer.actions;
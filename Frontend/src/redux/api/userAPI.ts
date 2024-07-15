/* eslint-disable no-useless-catch */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../../types/types"
import { MessageResponse, UserResponse } from "../../types/api-types";
import axios from "axios";





export const userAPI =  createApi({
    reducerPath: 'userApi',
    // /api/v1/user/new
    baseQuery: fetchBaseQuery({baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/user/`}),
    endpoints: (builder) => ({
        login: builder.mutation<MessageResponse, User>({
            query: (user) => ({
                url: 'new',
                method: "POST",
                body: user
            })
        })
    })

});

export const getUser =async (id:string) => {
    try {
        const {data}: {data: UserResponse} = await axios.get(`${import.meta.env.VITE_SERVER}/api/v1/user/${id}`);

        return data;
    } catch (error) {
        throw error;
    }
}

export const {useLoginMutation} = userAPI;  // useLoginMutation is a hook that can be used in components to make a login request
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../../types/types"
import { MessageResponse } from "../../types/api-types";





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

export const {useLoginMutation} = userAPI;  // useLoginMutation is a hook that can be used in components to make a login request
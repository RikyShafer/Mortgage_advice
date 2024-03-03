
import apiSlice from "../../app/apiSlice"
import { setToken } from "../auth/authSlice";

const UsersApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getAllUsers: build.query({
            query: () => ({
                url: "api/UserRegister",
                method:"GET",
            }),
              providesTags:["UserRegister"]
            }),
            getUserById: build.query({
                query: (userId) => ({
                    url: `api/UserRegister/${userId}`, // Use the provided ID in the URL
                    method: "GET",
                }),
                providesTags: (result, error, userId) => [{ type: 'UserRegister', _id: userId }], // Tag with specific ID
            }),
        addUser:build.mutation({
            query: (userRegister) => ({
                url: "api/UserRegister",
                method:"POST",
                body:userRegister
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                  const { data } = await queryFulfilled;
                  console.log("login:", data);
                  // Check if the accessToken is available in the response
                  console.log("login:", data);
                  if (data) {
                    // Dispatch the setToken action with the received token
                    dispatch(setToken({accessToken: data})); // Pass the accessToken directly to setToken
                  }
                } catch (err) {
                  console.error('Error during login:', err);
                }
              },
            invalidatesTags:["UserRegister"]
        }),
       updateUser:build.mutation({
            query: (userRegister) => ({
                url: "api/UserRegister",
                method:"PUT",
                body:userRegister
            }),
            invalidatesTags:["UserRegister"]
        }),
        deleteUser:build.mutation({
            query: ({_id}) => ({
                url: "api/UserRegister",
                method:"Delete",
                body:{_id}
            }),
            invalidatesTags:["UserRegister"]
        }),
    })
})
export const {
    useGetAllUsersQuery, useGetUserByIdQuery, useAddUserMutation, 
    useUpdateUserMutation, useDeleteUserMutation}=UsersApiSlice;


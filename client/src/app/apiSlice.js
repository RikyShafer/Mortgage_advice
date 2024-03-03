

import { createApi ,fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { setToken } from "../features/userRegister/authSlice";
const baseQuery =  fetchBaseQuery({
    baseUrl: 'http://localhost:3297/',
    credentials:'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token
console.log("get", getState() );
        // if(token){
            headers.set("authorization", `Bearer ${token}`)
      console.log("token" ,token);
        // }
        // console.log(token);
        return headers
       
    }

})

// const baseQueryWithReauth = async (args, api, extraOptions) => {
//   let result = await baseQuery(args, api, extraOptions);

//   if (result?.error?.status === 403) {
//     console.log("Refreshing token...");
    
//   const refreshResult=await baseQuery("/api/auth/refresh", api,extraOptions)
    
//     if (refreshResult?.data?.accessToken) {
//       // api.dispatch(setToken(refreshResult.data.accessToken));
//       api.dispatch(setToken({...refreshResult.data}));

//       console.log("Token refreshed successfully.");
      
//       // Retry the original request
//       result = await baseQuery(args, api, extraOptions);
//     } else {
//       console.error("Failed to refresh token:", refreshResult.error);
      
//       return refreshResult;
//     }
//   }
 
//   return result;
// };
const baseQueryWithReauth = async (args, api, extraOptions) => {
  // console.log(args) // request url, method, body
  // console.log(api) // signal, dispatch, getState()
  // console.log(extraOptions) //custom like {shout: true}

  let result = await baseQuery(args, api, extraOptions)
  // If you want, handle other status codes, too
  if (result?.error?.status === 403) {
      console.log('sending refresh token')

      // send refresh token to get new access token 
      const refreshResult = await baseQuery('/api/auth/refresh', api, extraOptions)

      if (refreshResult?.data) {

          // store the new token 
          api.dispatch(setToken({ ...refreshResult.data }))

          // retry original query with new access token
          result = await baseQuery(args, api, extraOptions)
      } else {

          if (refreshResult?.error?.status === 403) {
              refreshResult.error.data.message = "Your login has expired."
          }
          return refreshResult
      }
  }

  return result
}

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery:baseQueryWithReauth ,
  // baseQuery,

  endpoints: () => ({})
})

export default apiSlice;

// import { createApi ,fetchBaseQuery} from "@reduxjs/toolkit/query/react";

// const apiSlice = createApi({
//     reducerPath: 'api',
//     baseQuery: fetchBaseQuery({
//         baseUrl: 'http://localhost:3297/'
//     }),
//     endpoints: () => ({}),
// });

// export default apiSlice;
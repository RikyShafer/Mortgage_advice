



import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setToken } from "../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://mortgage-advice-1.onrender.com'||'https://mortgage-advice-1.onrender.com',

  // baseUrl: 'http://localhost:3297/',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  }
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 403) {
    const refreshResult = await baseQuery('/api/auth/refresh', api, extraOptions);
    if (refreshResult?.data) {
      api.dispatch(setToken(refreshResult.data.accessToken));
      result = await baseQuery(args, api, extraOptions);
    } else {
      // Handle refresh error
      return refreshResult;
    }
  }
  return result;
}

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({})
});

export default apiSlice;

// // import { createApi ,fetchBaseQuery} from "@reduxjs/toolkit/query/react";

// // const apiSlice = createApi({
// //     reducerPath: 'api',
// //     baseQuery: fetchBaseQuery({
// //         baseUrl: 'http://localhost:3297/'
// //     }),
// //     endpoints: () => ({}),
// // });

// // export default apiSlice;
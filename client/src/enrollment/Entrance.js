// import React from 'react'
// import { useGetQueryQuery } from "../API calls/DirectorAPICalls";

// const Entrance = () => {
//     const { data: userList, isLoading, isError, error } = useGetQueryQuery(); // Corrected usage of useGetQueryQuery
//   console.log(userList);
//     if (isLoading)
//         return <h1>Loading...</h1>;
//     if (isError)
//         return <h2>Error: {error}</h2>;
//     return (
//         <div className="Entrance-list">
        
//             {userList ? ( // Check if blogs is not undefined or null
//                 userList.map((user) => (
//                     <div className="EntranceMap" key={user._id}>
//                         <h1>{user.name} - שם פרטי </h1>
//                         <p>{user.username} - שם זהוי במערכת</p>
//                         <p>{user.email} - דוא"ל</p>
//                         <p>{user.city}- עיר</p>
//                         <p>{user.address}- רחוב</p>
//                         <p>{user.phone}- טלפון</p>
//                         <p>{user.date} - תאריך לידה</p>
//                         <p>{user.CountryBirth}- ארץ</p>


//                     </div>
//                 ))
//             ) : (
//                 <p>No data available</p>
//             )}
//         </div>
//     );
// };

// export default Entrance


// import React from 'react'
// import { useGetQueryQuery } from "../API calls/DirectorAPICalls"; // Import from DirectorAPICalls

// const Entrance = () => {
//     const { data: userList, isLoading, isError, error } = useGetQueryQuery(); // Corrected usage of useGetQueryQuery
//     console.log(userList);
//     if (isLoading)
//         return <h1>Loading...</h1>;
//     if (isError)
//         return <h2>Error: {error}</h2>;
//     return (
//         <div className="Entrance-list">
//             {userList ? (
//                 userList.map((user) => (
//                     <div className="EntranceMap" key={user._id}>
//                         <h1>{user.name} - שם פרטי </h1>
//                         <p>{user.username} - שם זהוי במערכת</p>
//                         <p>{user.email} - דוא"ל</p>
//                         <p>{user.city}- עיר</p>
//                         <p>{user.address}- רחוב</p>
//                         <p>{user.phone}- טלפון</p>
//                         <p>{user.date} - תאריך לידה</p>
//                         <p>{user.CountryBirth}- ארץ</p>
//                     </div>
//                 ))
//             ) : (
//                 <p>No data available</p>
//             )}
//         </div>
//     );
// };

// export default Entrance;



import React from 'react'
import { useGetUserQuery } from "../API calls/DirectorAPICalls"; // Import from DirectorAPICalls

const Entrance = () => {
    const { data: userList, isLoading, isError, error } = useGetUserQuery();
    console.log(userList);
    if (isLoading)
        return <h1>Loading...</h1>;
    
    if (isError)
        return <h2>Error: {error.message}</h2>; // Render error message instead of error object
    
    return (
        <div className="Entrance-list">
            {userList ? (
                userList.map((user) => (
                    <div className="EntranceMap" key={user._id}>
                        <h1>{user.name} - שם פרטי </h1>
                        <p>{user.username} - שם זהוי במערכת</p>
                        <p>{user.email} - דוא"ל</p>
                        <p>{user.city}- עיר</p>
                        <p>{user.address}- רחוב</p>
                        <p>{user.number}- מספר</p>
                        <p>{user.phone}- טלפון</p>
                        <p>{user.date} - תאריך לידה</p>
                        <p>{user.CountryBirth}- ארץ</p>
                    </div>
                ))
            ) : (
                <p>No data available</p>
            )}
        </div>
    );
};

export default Entrance;
// import React from 'react'
// import { useGetUserQuery } from "../API calls/DirectorAPICalls"; // Import from DirectorAPICalls

// const Entrance = () => {
//     const { data: userList, isLoading, isError, error } = useGetUserQuery();
//     console.log(userList);
//     if (isLoading)
//         return <h1>Loading...</h1>;
//     if (isError)
//         return <h2>Error: {error}</h2>;
//     return (
//         <div className="Entrance-list">
//             {userList ? (
//                 userList.map((user) => (
//                     <div className="EntranceMap" key={user._id}>
//                         <h1>{user.name} - שם פרטי </h1>
//                         <p>{user.username} - שם זהוי במערכת</p>
//                         <p>{user.email} - דוא"ל</p>
//                         <p>{user.city}- עיר</p>
//                         <p>{user.address}- רחוב</p>
//                         <p>{user.number}- מספר</p>
//                         <p>{user.phone}- טלפון</p>
//                         <p>{user.date} - תאריך לידה</p>
//                         <p>{user.CountryBirth}- ארץ</p>
//                     </div>
//                 ))
//             ) : (
//                 <p>No data available</p>
//             )}
//         </div>
//     );
// };

// export default Entrance;


// import React from 'react';
// import { useGetQueryQuery } from "../API calls/DirectorAPICalls";

// const Entrance = () => {
//     const { data: userList, isLoading, isError, error } = useGetQueryQuery(); // Corrected usage of useGetQueryQuery
//     if (isLoading)
//         return <h1>Loading...</h1>;
//     if (isError)
//         return <h2>Error: {error.message}</h2>; // Access error.message to display the error message

//     return (
//         <div className="Entrance-list">
//             {userList && userList.length > 0 ? (
//                 userList.map((user) => (
//                     <div className="EntranceMap" key={user._id}>
//                         <h1>{user.name} - שם פרטי </h1>
//                         <p>{user.username} - שם זהוי במערכת</p>
//                         <p>{user.email} - דוא"ל</p>
//                         <p>{user.city}- עיר</p>
//                         <p>{user.address}- רחוב</p>
//                         <p>{user.phone}- טלפון</p>
//                         <p>{user.date} - תאריך לידה</p>
//                         <p>{user.CountryBirth}- ארץ</p>


//                     </div>
//                 ))
//             ) : (
//                 <p>No data available</p>
//             )}
//         </div>
//     );
// };

// export default Entrance;

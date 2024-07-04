// import React, { useEffect, useRef, useState } from 'react';
// import axios from 'axios';
// import Cookies from 'js-cookie';
// import {jwtDecode} from 'jwt-decode'; // Fix the import for jwt-decode
// import { useRefreshMutation } from '../authApiSlice';

// const SsGoogle = () => {
//     const [decodedToken, setDecodedToken] = useState(null);
//     const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] = useRefreshMutation();
//     const effectRan = useRef(false);
//     const [trueSuccess, setTrueSuccess] = useState(false);
//     let token
//     const handleGoogleLogin = async () => {
//         try {
//             const response = await axios.get('http://localhost:3297/get-token', {
//                 withCredentials: true, // Ensure cookies are sent
//             });

//              token = response.data.token;

//             // Save the token in a cookie with js-cookie
//             Cookies.set('jwt', token, {
//                 expires: 7,
//                 secure: false, // Use false for HTTP, true for HTTPS
//                 sameSite: 'strict',
//             });

//             console.log("Token saved in cookie:", token);

//             // Decode the token and print its content
//             const decoded = jwtDecode(token);
//             setDecodedToken(decoded);
//             console.log("Decoded token:", decoded);

//         } catch (error) {
//             console.error("Error fetching the object:", error);
//         }
//     };

//     useEffect(() => {
      
//             const verifyRefreshToken = async () => {
//                 try {
//                     await refresh();
//                     setTrueSuccess(true);
//                 } catch (err) {
//                     console.error(err);
//                 }
//             };

//             if (!token) verifyRefreshToken();
    

//         return () => effectRan.current = true;
//     }, [token, refresh]);


    
//     return (
//         <div>
//             <h2>Login</h2>
//             <button onClick={handleGoogleLogin}>Login with Google</button>
//             {decodedToken && (
//                 <div>
//                     <h3>Decoded Token</h3>
//                     <pre>{JSON.stringify(decodedToken, null, 2)}</pre>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default SsGoogle;


import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode'; // Fix the import for jwt-decode
import { useRefreshMutation } from '../authApiSlice';

const SsGoogle = () => {
    const [decodedToken, setDecodedToken] = useState(null);
    const [refresh] = useRefreshMutation();
    const effectRan = useRef(false);
    const [trueSuccess, setTrueSuccess] = useState(false);
    let token;
    const handleGoogleLogin = async () => {
        try {
            const response = await axios.get('http://localhost:3297/get-token', {
                withCredentials: true,
            });
    
            const token = response.data.token;
            Cookies.set('jwt', token, {
                expires: 7,
                secure: false, // Use true if you're using HTTPS
                sameSite: 'strict',
            });
    
            console.log("Token saved in cookie:", token);
    
            const decoded = jwtDecode(token);
            setDecodedToken(decoded);
            console.log("Decoded token:", trueSuccess);
            console.log("Decoded token:", decoded);

        } catch (error) {
            console.error("Error fetching the object:", error);
        }
    };

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                await refresh();
                setTrueSuccess(true);
            } catch (err) {
                console.error(err);
            }
        };

        if (!token) verifyRefreshToken();

        return () => effectRan.current = true;
    }, [token, refresh]);

    return (
        <div>
            <h2>Login</h2>
            <button onClick={handleGoogleLogin}>Login with Google</button>
            {decodedToken && (
                <div>
                    <h3>Decoded Token</h3>
                    <pre>{JSON.stringify(decodedToken, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default SsGoogle;

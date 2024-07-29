import { Outlet } from "react-router-dom";
import { useEffect, useRef, useState } from 'react';
import { useRefreshMutation } from "./auth/authApiSlice";
import { useSelector } from 'react-redux';
import { selectToken } from "../app/authSlice";

const CheckLoginNotRequired = () => {
    const token = useSelector(selectToken);
    const effectRan = useRef(false);
    const [ setTrueSuccess] = useState(false);
    const [refresh, {
        // isUninitialized,
        isLoading,
        // isSuccess,
        // isError,
        // error
    }] = useRefreshMutation();

    useEffect(() => {
        if (effectRan.current === true || process.env.NODE_ENV !== 'development') { // React 18 Strict Mode
            const verifyRefreshToken = async () => {
                console.log('verifying refresh token');
                try {
                    await refresh();
                    setTrueSuccess(true);
                } catch (err) {
                    console.error(err);
                }
            };

            if (!token) verifyRefreshToken();
        }

        return () => {
            effectRan.current = true;
        };
        // eslint-disable-next-line
    }, [token, refresh]);

    let content;
    if (isLoading) {
        console.log('loading');
        content = <h1>בטעינה...</h1>;
    } else {
        content = <Outlet />;
    }

    return content;
};

export default CheckLoginNotRequired;

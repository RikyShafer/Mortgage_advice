

import { useSelector } from "react-redux";
import { selectToken } from "../features/auth/authSlice";
import {jwtDecode} from "jwt-decode"; // Fix the import statement

const useAuth = () => {
    const token = useSelector(selectToken);

    let isAdmin = false;
    let isUser = false;
    if (token) {
        const userDecoded = jwtDecode(token);
        console.log("userDecoded", userDecoded);
        const { _id, firstName, email, roles } = userDecoded;
        isAdmin = roles === "ADMIN";
        isUser = roles === "USER";
        return { _id, firstName, email, roles, isAdmin, isUser };
    }
    return { _id: "", email: "", isAdmin, isUser, firstName: "", roles: "" };
};

export default useAuth;



import { useSelector } from "react-redux";
import { selectToken } from "../features/auth/authSlice";
import {jwtDecode} from "jwt-decode"; 


const useAuth = () => {
    const token = useSelector(selectToken);

    let isAdmin = false;
    let isUser = false;
    let decodedToken = null;

    if (token) {
        try {
            decodedToken = jwtDecode(token);
            console.log("userDecoded", decodedToken);
            const { _id, firstName, email, roles } = decodedToken;
            console.log(_id, firstName, email, roles, "ffffff");
            isAdmin = String(roles).trim() === "ADMIN";
            isUser = String(roles).trim() === "USER";
            console.log("ADMIN:",isAdmin,"USER:", isUser );
            return { _id, firstName, email, roles, isAdmin, isUser };
        } catch (error) {
            console.error("Error decoding token:", error);
            // Handle invalid token
        }
    }

    return { _id: "", email: "", isAdmin, isUser, firstName: "", roles: "" };
};

export default useAuth;

import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import userInstance from "../api/userInstance";

function EmailVerification() {
    const { token } = useParams();
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState("");
    async function verifyEmail(jwt) {
        try {
            const { data } = await userInstance.get(`/verify-email/${jwt}`);
            setSuccess(data?.success);
            setMessage(data?.message);
        } catch (error) {
            toast.error(error.message);
        }
    }
    useEffect(() => {
        verifyEmail(token);
    }, [token]);
    return (
        <div className="flex flex-col gap-2">
            <h1 className="text-xl">EmailVerification</h1>
            {message &&
                <p>{message}</p>
            }
            {success &&
                <NavLink
                    to="/login"
                    className="bg-blue-500 cursor-pointer border border-blue-500 text-white max-w-24 text-center py-2 rounded-xl"
                >
                    Login
                </NavLink>}
        </div>
    );
}

export default EmailVerification;
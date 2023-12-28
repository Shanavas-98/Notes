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
        <div className="flex items-center justify-center h-screen">
            <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-700">Email Verification</h1>
                {message &&
                    <p className="text-lg font-semibold text-gray-500">{message}</p>
                }
                {success &&
                    <NavLink
                        to="/login"
                        className="bg-blue-500 cursor-pointer border border-blue-500 text-white max-w-24 text-center py-2 rounded-xl"
                    >
                        Login
                    </NavLink>}
            </div>
        </div>
    );
}

export default EmailVerification;
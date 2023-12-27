import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function HomePage() {
    const { user } = useContext(UserContext);

    return (
        <div>
            <h3 className="text-2xl">
                Welcome to Notes.
            </h3>
            <p className="text-md my-4">
                Here you can write, edit, delete your notes. This is a secure platform where you can write your notes.
            </p>
            {user ?
                <NavLink
                    to="/notes"
                    className="bg-blue-500 cursor-pointer border border-blue-500 text-white mx-2 px-4 py-2 rounded-xl"
                >
                    Your Notes
                </NavLink>
                :
                <>
                    <NavLink
                        to="/login"
                        className="bg-blue-500 cursor-pointer border border-blue-500 text-white mx-2 px-4 py-2 rounded-xl"
                    >
                        Login
                    </NavLink>
                    <NavLink
                        to="/register"
                        className="bg-green-500 cursor-pointer border border-green-500 text-white mx-2 px-4 py-2 rounded-xl"
                    >
                        Register
                    </NavLink>
                </>
            }

        </div>
    );
}

export default HomePage;
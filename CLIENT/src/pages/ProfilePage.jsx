import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function ProfilePage() {
    const {user,setUser} = useContext(UserContext);
    const navigate = useNavigate();
    const userLogout = () => {
      localStorage.removeItem("userToken");
      setUser(null);
      navigate("/");
    };
  return (
    <div className="flex flex-col">
        <h3 className="text-2xl">
        Name : {user?.name}
        </h3>
        <h3 className="text-2xl">
        Email : {user?.email}
        </h3>
        <button onClick={userLogout} className="primary max-w-sm mt-2">Logout</button>
    </div>
  );
}

export default ProfilePage;
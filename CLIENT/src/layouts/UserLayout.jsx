import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

function UserLayout() {
  return (
    <div className='min-h-full'>
      <Header />
      <div className='max-w-xl m-auto py-16'>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default UserLayout;

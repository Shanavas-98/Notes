import { Route, Routes } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserLayout from "./layouts/UserLayout";
import NotesPage from "./pages/NotesPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserAuth from "./hooks/UserAuth";
import NotePage from "./pages/NotePage";
import NoteFormPage from "./pages/NoteFormPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import EmailVerification from "./pages/EmailVerification";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<HomePage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="verify-email/:token" element={<EmailVerification />} />
          <Route element={<UserAuth />}>
            <Route path="profile" element={<ProfilePage />} />
            <Route path="notes" element={<NotesPage />} />
            <Route path="notes/:noteId" element={<NotePage />} />
            <Route path="notes/add" element={<NoteFormPage />} />
            <Route path="notes/edit/:noteId" element={<NoteFormPage />} />
          </Route>
        </Route>
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;

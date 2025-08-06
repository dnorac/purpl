import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Route, Routes } from "react-router-dom";
import "./App.scss";
import { useAppDispatch } from "./app/hooks";
import Navbar from "./app/Navbar";
import AddPostForm from "./features/posts/AddPostForm";
import EditPostForm from "./features/posts/EditPostForm";
import PostList from "./features/posts/PostList";
import { fetchPosts } from "./features/posts/postsSlice";
import SinglePostPage from "./features/posts/SinglePostPage";
import { fetchUsers, recoverToken } from "./features/thunks";
import LoginForm from "./features/user/LoginForm";
import PasswordRecovery from "./features/user/PasswordRecovery";
import UpdateProfileForm from "./features/user/UpdateProfileForm";
import CurrentUser from "./features/users/CurrentUser";
import PrivacyPolicy from "./features/users/PrivacyPolicy";
import RegisterForm from "./features/users/RegisterForm";
import SingleUserPage from "./features/users/SingleUserPage";
import TermsOfService from "./features/users/TermsOfService";
import UserList from "./features/users/UserList";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchUsers());
    dispatch(recoverToken());
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>Purpl</title>
      </Helmet>
      <Navbar />
      <CurrentUser />

      <Routes>
        <Route path="/users/:userId/update" element={<UpdateProfileForm />} />
        <Route path="/users/:userId" element={<SingleUserPage />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/registro" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/recuperar" element={<PasswordRecovery />} />
        <Route path="/termos" element={<TermsOfService />} />
        <Route path="/privacidade" element={<PrivacyPolicy />} />
        <Route path="/posts/add" element={<AddPostForm />} />
        <Route path="/posts/:postId/edit" element={<EditPostForm />} />
        <Route path="/posts/:postId" element={<SinglePostPage />} />
        <Route path="/" element={<PostList />} />
      </Routes>
    </>
  );
}

export default App;

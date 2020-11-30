import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import "./App.scss";
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
  const dispatch = useDispatch();

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

      <Switch>
        <Route path="/users/:userId/update">
          <UpdateProfileForm />
        </Route>
        <Route path="/users/:userId">
          <SingleUserPage />
        </Route>
        <Route path="/users">
          <UserList />
        </Route>
        <Route path="/registro">
          <RegisterForm />
        </Route>
        <Route path="/login">
          <LoginForm />
        </Route>
        <Route path="/recuperar">
          <PasswordRecovery />
        </Route>
        <Route path="/termos">
          <TermsOfService />
        </Route>
        <Route path="/privacidade">
          <PrivacyPolicy />
        </Route>
        <Route path="/posts/add">
          <AddPostForm />
        </Route>
        <Route path="/posts/:postId/edit">
          <EditPostForm />
        </Route>
        <Route path="/posts/:postId">
          <SinglePostPage />
        </Route>
        <Route path="/">
          <PostList />
        </Route>
      </Switch>
    </>
  );
}

export default App;

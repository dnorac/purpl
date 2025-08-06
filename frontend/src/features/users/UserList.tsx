import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Container, Grid, Segment } from "semantic-ui-react";
import { AppDispatch } from "../../app/store";
import { fetchUsers } from "../thunks";
import { useCurrentUser } from "../user/userSlice";
import { selectAllUsers } from "../users/usersSlice";
import User from "./User";

function UserList() {
  const { users, state } = useSelector(selectAllUsers);
  const user = useCurrentUser();

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (!user?.email) return <Navigate to="/login" replace />;

  if (state === "loading") return <h1>Carregando...</h1>;

  if (users.length === 0) return <h1>Não há usuários. :(</h1>;

  return (
    <Segment basic>
      <Container>
        <Grid columns={3} stackable doubling>
          {users.map((user) => (
            <User key={user._id} user={user} />
          ))}
        </Grid>
      </Container>
    </Segment>
  );
}

export default UserList;

import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Container, Segment } from "semantic-ui-react";
import { RootState } from "../../app/store";

interface RequireAuthProps {
  children: ReactNode;
}

export default function RequireAuth({ children }: RequireAuthProps) {
  const auth = useSelector((state: RootState) => state.currentUser);
  const user = auth.user;
  const userState = auth.state;

  if (userState === "idle" || userState === "loading") {
    return (
      <Segment basic>
        <Container>
          <Segment loading style={{ minHeight: 200 }}>
            <div>Carregando usuário...</div>
          </Segment>
        </Container>
      </Segment>
    );
  }

  if (!user?.email) return <Navigate to="/login" replace />;

  return <>{children}</>;
}

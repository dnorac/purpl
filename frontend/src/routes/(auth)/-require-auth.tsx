import { Center, Container, Loader, Paper, Text } from "@mantine/core";
import { Navigate } from "@tanstack/react-router";
import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../-store";

interface RequireAuthProps {
  children: ReactNode;
}

export default function RequireAuth({ children }: RequireAuthProps) {
  const auth = useSelector((state: RootState) => state.currentUser);
  const user = auth.user;
  const userState = auth.state;

  if (userState === "idle" || userState === "loading") {
    return (
      <Container size="lg" py="xl">
        <Paper withBorder p="xl">
          <Center>
            <div>
              <Loader size="lg" />
              <Text mt="md" ta="center">
                Carregando usuário...
              </Text>
            </div>
          </Center>
        </Paper>
      </Container>
    );
  }

  if (!user?.email) return <Navigate to="/login" replace />;

  return <>{children}</>;
}

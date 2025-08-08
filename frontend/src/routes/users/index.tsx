import { createFileRoute } from "@tanstack/react-router";
import RequireAuth from "../../features/auth/RequireAuth";
import UserList from "../../features/users/UserList";

export const Route = createFileRoute("/users/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <RequireAuth>
      <UserList />
    </RequireAuth>
  );
}

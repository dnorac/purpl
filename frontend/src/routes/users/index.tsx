import { createFileRoute } from "@tanstack/react-router";
import RequireAuth from "../(auth)/-require-auth";
import UserList from "./-user-list";

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

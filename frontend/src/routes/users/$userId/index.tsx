import { createFileRoute } from "@tanstack/react-router";
import RequireAuth from "../../(auth)/-require-auth";
import UserProfile from "./-user-profile";

export const Route = createFileRoute("/users/$userId/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <RequireAuth>
      <UserProfile />
    </RequireAuth>
  );
}

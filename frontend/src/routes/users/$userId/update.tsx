import { createFileRoute } from "@tanstack/react-router";
import RequireAuth from "../../(auth)/-require-auth";
import UpdateProfileForm from "./-update-profile.form";

export const Route = createFileRoute("/users/$userId/update")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <RequireAuth>
      <UpdateProfileForm />
    </RequireAuth>
  );
}

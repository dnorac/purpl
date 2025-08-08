import { createFileRoute } from "@tanstack/react-router";
import RequireAuth from "../../features/auth/RequireAuth";
import AddPostForm from "./-add-post.form";

export const Route = createFileRoute("/posts/add")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <RequireAuth>
      <AddPostForm />
    </RequireAuth>
  );
}

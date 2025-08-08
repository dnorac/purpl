import { createFileRoute } from "@tanstack/react-router";
import RequireAuth from "../../../features/auth/RequireAuth";
import EditPostForm from "./-edit-post.form";

export const Route = createFileRoute("/posts/$postId/edit")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <RequireAuth>
      <EditPostForm />
    </RequireAuth>
  );
}

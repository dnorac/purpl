import { createFileRoute } from "@tanstack/react-router";
import RequireAuth from "../(auth)/-require-auth";
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

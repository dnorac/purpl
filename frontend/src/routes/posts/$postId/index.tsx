import { createFileRoute } from "@tanstack/react-router";
import RequireAuth from "../../../features/auth/RequireAuth";
import SinglePostPage from "./-single-post";

export const Route = createFileRoute("/posts/$postId/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <RequireAuth>
      <SinglePostPage />
    </RequireAuth>
  );
}

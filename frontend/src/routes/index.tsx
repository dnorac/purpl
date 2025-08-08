import { createFileRoute } from "@tanstack/react-router";
import RequireAuth from "./(auth)/-require-auth";
import PostList from "./posts/-post-list";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <RequireAuth>
      <PostList />
    </RequireAuth>
  );
}

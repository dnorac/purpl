import { createFileRoute } from "@tanstack/react-router";
import TermsOfService from "../features/users/TermsOfService";

export const Route = createFileRoute("/terms-of-use")({
  component: RouteComponent,
});

function RouteComponent() {
  return <TermsOfService />;
}

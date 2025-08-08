import { createFileRoute } from "@tanstack/react-router";
import PrivacyPolicy from "../features/users/PrivacyPolicy";

export const Route = createFileRoute("/privacy-policy")({
  component: RouteComponent,
});

function RouteComponent() {
  return <PrivacyPolicy />;
}

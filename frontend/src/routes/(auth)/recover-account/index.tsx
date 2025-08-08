import { createFileRoute } from "@tanstack/react-router";
import PasswordRecovery from "./-password-recovery";

export const Route = createFileRoute("/(auth)/recover-account/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <PasswordRecovery />;
}

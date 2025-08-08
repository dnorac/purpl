import {
  Anchor,
  AppShell,
  Burger,
  createTheme,
  MantineProvider,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { useEffect } from "react";

import "../App.scss";

import { useAppDispatch } from "./-hooks";
import { fetchPosts } from "./posts/-thunks/fetch-posts";
import { fetchUsers } from "./users/-thunks/fetch-users";
import { recoverToken } from "./users/-thunks/recover-token";

const theme = createTheme({
  primaryColor: "purpl",
  colors: {
    purpl: [
      "#f3e8ff",
      "#e9d5ff",
      "#d8b4fe",
      "#c084fc",
      "#a855f7",
      "#9333ea",
      "#591e9c", // This is our main purplPrimaryColor
      "#4a1882",
      "#3c1361",
      "#2e0f4c",
    ],
  },
  primaryShade: 6, // Use index 6 which is our main color #591e9c
});

function RootComponent() {
  const dispatch = useAppDispatch();

  const [opened, { toggle }] = useDisclosure();

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchUsers());
    dispatch(recoverToken());
  }, [dispatch]);

  return (
    <>
      <MantineProvider theme={theme}>
        <AppShell padding="md" header={{ height: 60 }}>
          <AppShell.Header>
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            <Anchor component={Link} to="/">
              Logo
            </Anchor>
          </AppShell.Header>
          <AppShell.Main>
            <Outlet />
          </AppShell.Main>
        </AppShell>
      </MantineProvider>
      <TanStackRouterDevtools />
    </>
  );
}

export const Route = createRootRoute({
  component: () => <RootComponent />,
});

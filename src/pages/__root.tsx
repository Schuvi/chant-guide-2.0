import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import Content from "@/components/atoms/layouts/Content";
import Sidebar from "@/components/moleculs/Sidebar/Sidebar";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <div className="flex h-screen">
        <Sidebar />
        <Content>
          <Outlet />
        </Content>
      </div>
      {import.meta.env.DEV ? (
        <TanStackRouterDevtools position="bottom-left" />
      ) : null}
    </>
  );
}

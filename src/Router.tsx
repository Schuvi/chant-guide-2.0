import { QueryClient } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const queryClient = new QueryClient();

const router = createRouter({
  routeTree,
  defaultPendingComponent: () => <div>Loading...</div>,
  defaultErrorComponent: ({ error }) => <div>Error: {error.message}</div>,
  defaultNotFoundComponent: () => (
    <div>
      <h1>404 Not Found</h1>
    </div>
  ),
  context: {
    queryClient,
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

export default function Router() {
    return <RouterProvider router={router} />
}

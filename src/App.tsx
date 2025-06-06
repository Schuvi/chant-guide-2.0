import { QueryClientProvider } from "@tanstack/react-query";
import Router, { queryClient } from "./Router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"; // Create a client
import "./index.css";
import NiceModal from "@ebay/nice-modal-react";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NiceModal.Provider>
        <Router />
      </NiceModal.Provider>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}

export default App;

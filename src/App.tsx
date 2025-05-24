import { QueryClientProvider } from "@tanstack/react-query"
import Router, { queryClient } from "./Router"
import {ReactQueryDevtools} from '@tanstack/react-query-devtools' // Create a client
import './index.css'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App

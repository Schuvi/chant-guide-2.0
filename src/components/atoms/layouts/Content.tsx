import { type ReactNode } from "react";

export default function Content({ children }: { children: ReactNode }) {
  return (
    <div className="grow p-6 overflow-x-auto">
      {children}
    </div>
  );
}

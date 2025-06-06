import { DynamicIcon } from "@/components/atoms/DynamicIcon";
import { useLocation, useNavigate } from "@tanstack/react-router";

export default function BottomNav() {
  const navigate = useNavigate();

  const location = useLocation().pathname;

  return (
    <nav
      className={`h-10 md:h-15 fixed bottom-0 left-0 right-0 bg-[#1e2124] flex justify-between border-t border-white lg:hidden ${location.includes("chant") ? "hidden" : ""}`}
    >
      <div
        className="container flex items-center justify-center"
        onClick={() => navigate({ to: "/" })}
      >
        <DynamicIcon
          iconName="Home"
          sx={{
            color: "white",
            fontSize: "1.7rem",
          }}
        />
      </div>
      <div
        className="container flex items-center justify-center"
        onClick={() => navigate({ to: "/new-chant" })}
      >
        <DynamicIcon
          iconName="Add"
          sx={{ color: "white", fontSize: "1.7rem" }}
        />
      </div>
    </nav>
  );
}

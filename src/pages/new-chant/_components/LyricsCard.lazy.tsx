import { useLyricsStore } from "@/store/useLyricsStore";
import { useMusicStore } from "@/store/useMusicStore";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

export const Route = createLazyFileRoute("/new-chant/_components/LyricsCard")({
  component: LyricsCard,
});

interface LyricsCardProps {
  lyrics: string;
  id: number;
  timestamp: number;
  isSynced?: boolean;
  lyricsLength: number;
}

export default function LyricsCard({
  lyrics,
  id,
  timestamp,
  isSynced,
  lyricsLength,
}: LyricsCardProps) {
  const currentlyActiveCard = useLyricsStore(
    (state) => state.currentlyActiveCard
  );
  const currentTimestamp = useMusicStore((state) => state.currentTimestamp);
  const updateLyricsTimestamp = useLyricsStore(
    (state) => state.updateLyricTimestamp
  );
  const isActive = currentlyActiveCard == id;
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isActive && cardRef.current) {
      const threshold = 6;

      const isNearEnd = id >= lyricsLength - threshold;

      if (!isNearEnd) {
        requestAnimationFrame(() => {
          cardRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        });
      }
      updateLyricsTimestamp(id, currentTimestamp);
    }
  }, [isActive, currentTimestamp, id, lyricsLength]);

  const formatTimestamp = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div
      ref={cardRef}
      id={`l-${id}`}
      className={`
                bg-transparent
                items-center 
                ${isActive ? "ring-2 ring-white bg-blue-400/20" : ""} 
                min-h-[50px] 
                rounded-md 
                m-1
                p-1
                font-semibold 
                text-base 
                grid 
                grid-cols-[90%_10%] 
                hover:cursor-pointer
                hover:ring-2
                hover:ring-white
                transition-colors
                duration-200
            `}
    >
      <div className="flex justify-between items-center">
        <p className="text-white">{lyrics}</p>
        {isSynced && (
          <span className="text-sm opacity-70 text-white">
            {formatTimestamp(timestamp)}
          </span>
        )}
      </div>
    </div>
  );
}

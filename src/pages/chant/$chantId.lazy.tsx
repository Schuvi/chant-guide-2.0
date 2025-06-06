import { ChantDetail, type IChantDetail } from "@/Constants/ChantDetail";
import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import ReactPlayer from "react-player/youtube";
import { useRef, useState } from "react";
import type { OnProgressProps } from "react-player/base";
import LyricsComponent from "./_components/Lyrics.lazy";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const Route = createLazyFileRoute("/chant/$chantId")({
  component: ChantPage,
});

function ChantPage() {
  const { chantId } = Route.useParams();

  const [played, setPlayed] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const playerRef = useRef<ReactPlayer>(null);

  const navigate = useNavigate();

  const chantData = ChantDetail.find((item) => item.id === chantId);

  const trackProgress = (progress: OnProgressProps) => {
    setPlayed(progress.playedSeconds);
  };

  const handleLyricClick = (time: number) => {
    if (playerRef.current) {
      playerRef.current.seekTo(time, "seconds");

      setIsPlaying(true);

      playerRef.current.getInternalPlayer()?.focus?.();
    }
  };

  const handlePlay = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);

  return (
    <div className="flex h-full max-h-screen gap-10">
      <div className="flex flex-col">
        <div className="flex gap-1 items-center">
          <button
            className="cursor-pointer"
            onClick={() => navigate({ to: "/" })}
          >
            <ArrowBackIcon fontSize="medium" sx={{ color: "white" }} />
          </button>

          <h3 className="text-white select-none text-xl">Back</h3>
        </div>

        <div className="flex items-center h-full">
          <ReactPlayer
            ref={playerRef}
            url={chantData?.videoUrl}
            onProgress={trackProgress}
            playing={isPlaying}
            onPlay={handlePlay}
            onPause={handlePause}
            controls
            config={{
              playerVars: {
                playsinline: 1,
                rel: 0,
                modestbranding: 1,
                enablejsapi: 1,
              },
            }}
          />
        </div>

      </div>

      <LyricsComponent
        currentPlayed={played}
        textLyrics={chantData as IChantDetail}
        onLyricClick={handleLyricClick}
      />
    </div>
  );
}

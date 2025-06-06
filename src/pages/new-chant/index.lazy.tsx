import { createLazyFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Input } from "@/components/atoms/Input";
import MusicVideoIcon from "@mui/icons-material/MusicVideo";
import ReactPlayer from "react-player/youtube";
import useDebounce from "@/hooks/useDebounce";
import LyricSync from "./_components/LyricContainer.lazy";
import { useMusicStore } from "@/store/useMusicStore";
import type { OnProgressProps } from "react-player/base";
import { useLyricsStore } from "@/store/useLyricsStore";
import { useNavStore } from "@/store/useNavStore";
import { formatLineByLineLyrics } from "@/utils/formatLineByLineLyrics";
import { formatWordByWordLyrics } from "@/utils/formatWordByLine";
import SearchIcon from "@mui/icons-material/Search";
import RestoreIcon from "@mui/icons-material/Restore";

export const Route = createLazyFileRoute("/new-chant/")({
  component: NewChant,
});

function NewChant() {
  const [isUrlValid, setIsValid] = useState<boolean>(true);
  const [isLoading, setLoading] = useState(false);
  const videoRef = useRef<ReactPlayer>(null);
  const { setCurrentTimeStamp, setAudioUrl, audioUrl } = useMusicStore();
  const { syncedLyrics, resetSync, wordByWordLyrics } = useLyricsStore();
  const { currentNav, setCurrentNav } = useNavStore();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAudioUrl(e.target.value);
  };

  const handleSearch = () => {
    if (
      !audioUrl?.includes("https://youtu.be/") &&
      !audioUrl?.includes("https://www.youtube.com/")
    ) {
      setIsValid(false);
      return;
    }

    setIsValid(true);
    setLoading(true);
  };

  const link = useDebounce(audioUrl, 500);

  const trackProgress = (progress: OnProgressProps) => {
    setCurrentTimeStamp(progress.playedSeconds);
  };

  const onClickLyricReset = () => {
    setCurrentNav(null);
    resetSync();
    if (videoRef.current && videoRef.current.getCurrentTime() > 1.0) {
      videoRef.current?.seekTo(0, "seconds");
    }
  };

  const onClickSave = () => {
    if (currentNav === "line") {
      formatLineByLineLyrics(syncedLyrics);
    } else {
      formatWordByWordLyrics(wordByWordLyrics, syncedLyrics);
    }
  };

  return (
    <div className="grid grid-rows-2 md:grid-cols-2 md:grid-rows-none h-full max-h-screen gap-5">
      <div className="container flex flex-col h-full gap-2">
        <div className="flex gap-2">
          <Input
            className="input w-64 lg:w-72"
            placeholder="Enter youtube link video here...."
            startIcon={<MusicVideoIcon sx={{ color: "white" }} />}
            value={audioUrl ?? ""}
            onChange={handleOnChange}
          />

          <div className="flex justify-between w-full">
            <button
              className="bg-white text-black p-2 rounded-lg hover:bg-white/55 cursor-pointer transition-all duration-200"
              type="button"
              onClick={handleSearch}
            >
              <SearchIcon sx={{ bgcolor: "transparent", color: "black" }} />
            </button>

            {currentNav !== null && (
              <button
                type="button"
                className="bg-white text-black p-2 rounded-lg hover:bg-white/55 cursor-pointer transition-all duration-200"
                onClick={onClickLyricReset}
              >
                <RestoreIcon sx={{ bgcolor: "transparent", color: "black" }} />
              </button>
            )}
          </div>
        </div>

        {isUrlValid === false && (
          <h1 className="text-red-500/75">
            Please enter a valid youtube video url
          </h1>
        )}

        {isLoading && <h1 className="text-white">Loading....</h1>}

        <div className="container flex items-center h-full">
          <ReactPlayer
            ref={videoRef}
            url={link ?? ""}
            controls
            onReady={() => setLoading(false)}
            onProgress={trackProgress}
            width={"100%"}
            height={"300px"}
          />
        </div>

        <div className="flex justify-center">
          <button
            type="button"
            className={`bg-white text-black rounded-lg w-1/2 h-[50px] hover:bg-white/55 cursor-pointer transition-all duration-200 ${syncedLyrics.length < 1 ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={onClickSave}
            disabled={syncedLyrics.length < 1}
          >
            Save
          </button>
        </div>
      </div>

      <LyricSync />
    </div>
  );
}

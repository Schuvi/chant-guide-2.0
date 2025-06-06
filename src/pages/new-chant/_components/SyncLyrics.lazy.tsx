import { useLyricsStore } from "@/store/useLyricsStore";
import { createLazyFileRoute } from "@tanstack/react-router";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LyricsCard from "./LyricsCard.lazy";

export const Route = createLazyFileRoute("/new-chant/_components/SyncLyrics")({
  component: SyncLyrics,
});

const SyncControls = ({ lyricsTotal }: { lyricsTotal: number }) => {
  const currentlyActiveCard = useLyricsStore(
    (state) => state.currentlyActiveCard
  );
  const setCurrentlyActiveCard = useLyricsStore(
    (state) => state.setCurrentlyActiveCard
  );
  const revertTimestamp = useLyricsStore((state) => state.revertTimestamp);
  const lyricsLength = useLyricsStore((state) => state.syncedLyrics.length);
  const handleUpClick = () => {
    if (currentlyActiveCard > 0) {
      revertTimestamp(currentlyActiveCard);
      setCurrentlyActiveCard(currentlyActiveCard - 1);
    }
  };

  const handleDownClick = () => {
    if (currentlyActiveCard + 1 > lyricsLength) {
      console.log("End");
    } else {
      setCurrentlyActiveCard(currentlyActiveCard + 1);
    }
  };

  const isEndOfLyrics = currentlyActiveCard === lyricsTotal;

  return (
    <div
      className={`sticky bottom-0 shadow-up transition-all flex items-center justify-center left-0 right-0 w-full h-16 bg-transparent shadow-md z-10`}
    >
      <div className="h-full space-x-2 text-white flex items-center justify-between">
        <button
          onKeyDown={(e) => console.log(e)}
          onClick={handleUpClick}
          disabled={currentlyActiveCard === 0}
          className={`h-14 w-28 bg-white hover:bg-white/70 active:scale-[.9] transition-all duration-200 flex rounded-md items-center justify-center ${
            currentlyActiveCard === 0 ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          <ExpandLessIcon
            sx={{ backgroundColor: "transparent", color: "black" }}
          />
        </button>
        <button
          onClick={handleDownClick}
          disabled={isEndOfLyrics}
          className={`h-14 w-28 bg-white hover:bg-white/70 active:scale-[.9] transition-all duration-200 flex rounded-md items-center justify-center ${isEndOfLyrics ? "cursor-not-allowed" : "cursor-pointer"}`}
        >
          <ExpandMoreIcon
            sx={{ backgroundColor: "transparent", color: "black" }}
          />
        </button>
      </div>
    </div>
  );
};

export default function SyncLyrics() {
  const lyrics = useLyricsStore((state) => state.syncedLyrics);
  const totalLyrics = lyrics.length;

  return (
    <div id="sync-container" className="relative h-full w-full flex flex-col justify-between">
      <div className="max-h-[80%] overflow-y-auto">
        <LyricsCard
          key={0}
          lyrics=""
          id={0}
          timestamp={0}
          lyricsLength={totalLyrics + 1}
        />
        {lyrics.map((lyric, i) => (
          <LyricsCard
            key={i + 1}
            id={i + 1}
            lyrics={lyric.lyrics}
            timestamp={lyric.timestamp}
            isSynced={lyric.isSynced}
            lyricsLength={totalLyrics + 1}
          />
        ))}
      </div>

      <SyncControls lyricsTotal={totalLyrics} />
    </div>
  );
}

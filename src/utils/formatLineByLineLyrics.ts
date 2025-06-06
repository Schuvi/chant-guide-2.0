import type { SyncedLyrics } from "@/store/useLyricsStore";
import { formatTimestamp } from "./formatTimeStamp";

export const formatLineByLineLyrics = (syncedLyrics: SyncedLyrics[]) => {
  const syncLyrics = syncedLyrics
    .filter((line) => line.isSynced)
    .map((line) => `[${formatTimestamp(line.timestamp)}]${line.lyrics}`);

  return syncLyrics.join("\n");
};

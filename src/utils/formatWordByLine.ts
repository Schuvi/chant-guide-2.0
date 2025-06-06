import type { SyncedLyrics, WordByWordLyrics } from "@/store/useLyricsStore";
import { formatTimestamp } from "./formatTimeStamp";

export const formatWordByWordLyrics = (
  wordByWordLyrics: WordByWordLyrics[],
  syncedLyrics: SyncedLyrics[]
) => {
  return wordByWordLyrics
    .map((line, lineIndex) => {
      if (!line.lyrics || line.lyrics.length === 0) return "";
      const lineStart = formatTimestamp(
        wordByWordLyrics[lineIndex].lyrics[0].timestamp
      );
      let wordTimings = "";

      line.lyrics.forEach((wordTiming, index) => {
        if (wordTiming.timestamp > 0) {
          wordTimings += `<${formatTimestamp(wordTiming.timestamp)}>${wordTiming.lyrics}${index < line.lyrics.length - 1 ? " " : ""}`;
        } else {
          wordTimings += `${wordTiming.lyrics}${index < line.lyrics.length - 1 ? " " : ""}`;
        }
      });
      return `[${lineStart}]${wordTimings} <${formatTimestamp(syncedLyrics[lineIndex].timestamp + 0.5)}>`;
    })
    .filter((line) => line !== "");
};

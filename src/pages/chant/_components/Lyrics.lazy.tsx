import type { IChantDetail } from "@/Constants/ChantDetail";
import { createLazyFileRoute } from "@tanstack/react-router";
import Liricle from "liricle";
import { useEffect, useState, useRef } from "react";

export const Route = createLazyFileRoute("/chant/_components/Lyrics")({
  component: LyricsComponent,
});

interface Word {
  time: number;
  text: string;
}

interface LyricLine {
  time: number;
  text: string;
  words?: Word[];
}

export default function LyricsComponent({
  textLyrics,
  currentPlayed,
  onLyricClick,
}: {
  textLyrics: IChantDetail;
  currentPlayed: number;
  onLyricClick: (time: number) => void;
}) {
  const [currentLyric, setCurrentLyric] = useState<number>(0);
  const [lyricsData, setLyricsData] = useState<{ lines: LyricLine[] } | null>(
    null
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const lyricRefs = useRef<{ [key: number]: HTMLHeadingElement | null }>({});
  const [isEnhanced, setIsEnhanced] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    };
    setIsMobile(checkIsMobile());
  }, []);

  const liricleRef = useRef<Liricle | null>(null);
  if (!liricleRef.current) {
    liricleRef.current = new Liricle();
  }

  useEffect(() => {
    const liricle = liricleRef.current!;

    const handleLoad = (data: any) => {
      setLyricsData(data);
      if (data.enhanced) {
        setIsEnhanced(!isEnhanced);
      }
    };

    const handleSync = (line: any) => {
      if (line) {
        setCurrentLyric(line.index);
      }
    };

    liricle.on("load", handleLoad);
    liricle.on("sync", handleSync);
    liricle.on("loaderror", (error) => {
      console.error("Failed to load lyrics:", error.message);
    });

    liricle.load({
      text: textLyrics?.chant as string,
    });

    return () => {
      null;
    };
  }, [textLyrics]);

  useEffect(() => {
    if (liricleRef.current) {
      liricleRef.current.sync(currentPlayed, false);
    }
  }, [currentPlayed]);

  useEffect(() => {
    const activeElement = lyricRefs.current[currentLyric];
    const container = containerRef.current;

    if (!activeElement || !container) return;

    if (isMobile) {
      activeElement.scrollIntoView({
        block: "center",
        behavior: "auto",
      });
    } else {
      const containerHeight = container.clientHeight;
      const elementHeight = activeElement.clientHeight;
      const elementOffsetTop = activeElement.offsetTop;

      const scrollTarget =
        elementOffsetTop - containerHeight / 2 + elementHeight / 2;

      const maxScrollTop = container.scrollHeight - containerHeight;
      const minScroll = Math.max(0, Math.min(scrollTarget, maxScrollTop));

      container.scrollTo({
        top: minScroll,
        behavior: "smooth",
      });
    }
  }, [currentLyric, lyricsData, isMobile]);

  const handleLyricClick = (lineIndex: number) => {
    if (lyricsData && lyricsData.lines[lineIndex]) {
      const startTime = lyricsData.lines[lineIndex].time;
      onLyricClick(startTime);
    }
  };

  const shouldHighlightWord = (lineIndex: number, wordTime: number) => {
    if (lineIndex < currentLyric) return true;

    if (lineIndex > currentLyric) return false;

    return wordTime <= currentPlayed;
  };

  return (
    <div
      ref={containerRef}
      className="max-h-full overflow-auto bg-[#353a3e] rounded-lg p-2"
    >
      {lyricsData?.lines.map((item: LyricLine, index: number) => (
        <h1
          key={index}
          ref={(el) => (lyricRefs.current[index] = el)}
          className={`mb-3 select-none text-center bg-transparent transition-colors duration-300 cursor-pointer hover:bg-gray-700 p-2 rounded-md ${
            index <= currentLyric ? "text-white" : "text-blue-300"
          }`}
          onClick={() => handleLyricClick(index)}
        >
          {isEnhanced && item.words ? (
            <span className="bg-transparent select-none">
              {item.words.map(
                (word, wordIndex) =>
                  word.text.trim() && (
                    <span
                      key={wordIndex}
                      className={`transition-colors select-none duration-300 bg-transparent ${
                        shouldHighlightWord(index, word.time)
                          ? "text-blue-300 font-medium"
                          : index < currentLyric
                            ? "text-blue-300"
                            : "text-white"
                      }`}
                    >
                      {word.text}{" "}
                    </span>
                  )
              )}
            </span>
          ) : (
            item.text
          )}
        </h1>
      ))}
    </div>
  );
}

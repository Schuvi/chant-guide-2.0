import { useLyricsStore } from "@/store/useLyricsStore";
import { useMusicStore } from "@/store/useMusicStore";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/new-chant/_components/WordByWordSync")({
  component: WordByWordSync,
});

export default function WordByWordSync() {
  const {
    syncedLyrics,
    updateLyricTimestamp,
    currentlyActiveCard,
    setCurrentlyActiveCard,
    updateWordByWordLyrics,
  } = useLyricsStore();
  const { controlsState, currentTimestamp } = useMusicStore();
  const [words, setWords] = useState<string[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (syncedLyrics.length > 0 && currentlyActiveCard < syncedLyrics.length) {
      const currentLine = syncedLyrics[currentlyActiveCard]?.lyrics || "";
      setWords(currentLine.split(" "));
      setCurrentWordIndex(0);
      if (sliderRef.current) {
        sliderRef.current.style.left = "0px";
      }
    }
  }, [syncedLyrics, currentlyActiveCard]);

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);

    if (currentWordIndex === words.length - 1) {
      updateLyricTimestamp(currentlyActiveCard, currentTimestamp);
      if (currentlyActiveCard < syncedLyrics.length - 1) {
        setCurrentlyActiveCard(currentlyActiveCard + 1);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("mouseup", handleDragEnd);
    document.addEventListener("touchend", handleDragEnd);
    return () => {
      document.removeEventListener("mouseup", handleDragEnd);
      document.removeEventListener("touchend", handleDragEnd);
    };
  }, [currentWordIndex, words.length, currentlyActiveCard]);

  const handleSliderDrag = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || !containerRef.current || !sliderRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const newPosition = Math.max(clientX - containerRect.left, 0);
    const containerWidth = containerRect.width;
    const sliderWidth = sliderRef.current.offsetWidth;

    const newLeft = Math.max(
      0,
      Math.min(newPosition - sliderWidth / 2, containerWidth - sliderWidth)
    );
    sliderRef.current.style.left = `${newLeft}px`;
    const progress = newLeft / (containerWidth - sliderWidth);
    const newWordIndex = Math.floor(progress * (words.length - 1));
    const currentWordIndex = Math.max(
      0,
      Math.min(newWordIndex, words.length - 1)
    );
    updateWordByWordLyrics(
      currentlyActiveCard,
      currentWordIndex,
      currentTimestamp
    );
    setCurrentWordIndex(currentWordIndex);
  };

  return (
    <div className="h-full relative">
      <div
        id="sync-container"
        className="h-[80%] max-h-[80%] overflow-y-auto md:w-[90%] sm:w-[99%] mx-auto relative select-none"
      >
        <div className="space-y-4 pb-32">
          {syncedLyrics.map((line, index) => (
            <div
              key={index}
              className={`p-4 border rounded-lg transition-all duration-200 ${
                index === currentlyActiveCard
                  ? "border-white"
                  : index < currentlyActiveCard
                    ? "opacity-50"
                    : "border-transparent"
              }`}
            >
              {index === currentlyActiveCard ? (
                line.lyrics.split(" ").map((word, wordIndex) => (
                  <span
                    key={wordIndex}
                    className={`text-lg ${
                      wordIndex <= currentWordIndex
                        ? "text-blue-500 font-semibold"
                        : "text-white"
                    } transition-colors duration-200`}
                  >
                    {word}{" "}
                  </span>
                ))
              ) : (
                <span className="text-lg text-white">{line.lyrics}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div
        ref={containerRef}
        className={`absolute h-12 bg-black rounded-full mx-auto mb-4 transition-all ${
          controlsState ? "bottom-[130px]" : "bottom-[82px]"
        } overflow-hidden z-40`}
        style={{
          left: "50%",
          transform: "translateX(-50%)",
          width: "calc(100% - 2rem)",
          maxWidth: "500px",
        }}
        onMouseMove={handleSliderDrag}
        onTouchMove={handleSliderDrag}
        onClick={handleSliderDrag}
      >
        <div className="absolute inset-0 flex items-center bg-white">
          {words.map((_, index) => (
            <div
              key={index}
              className={`h-1 w-1 bg-black rounded-full mx-[calc(100%/${words.length})]`}
              style={{
                position: "absolute",
                left: `${index == words.length - 1 ? (index / words.length) * 100 + 20 : (index / (words.length - 1)) * 100}%`,
              }}
            ></div>
          ))}
        </div>
        <div
          className="absolute top-0 left-0 h-full bg-black rounded-l-full transition-all"
          style={{
            width: `${(currentWordIndex / (words.length - 1)) * 100}%`,
          }}
        />
        <div
          ref={sliderRef}
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
          className="absolute top-1/2 -translate-y-1/2 h-10 w-10 bg-black rounded-full cursor-grab active:cursor-grabbing shadow-lg hover:shadow-xl flex items-center justify-center touch-none"
        >
          <div className="w-5 h-5 flex flex-col justify-center items-center gap-1">
            <div className="w-4 h-0.5 bg-white rounded-full" />
            <div className="w-4 h-0.5 bg-white rounded-full" />
            <div className="w-4 h-0.5 bg-white rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

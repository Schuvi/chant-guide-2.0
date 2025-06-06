import { useLyricsStore } from "@/store/useLyricsStore";
import { createLazyFileRoute } from "@tanstack/react-router";
import { Textarea } from "@/components/atoms/Textarea";

export const Route = createLazyFileRoute("/new-chant/_components/InputLyrics")({
  component: InputLyrics,
});

export default function InputLyrics() {
  const lyrics = useLyricsStore((state) => state.staticLyrics);
  const setLyrics = useLyricsStore((state) => state.setStaticLyrics);

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLyrics(e.target.value);
  };

  return (
    <div className="w-full h-1/2 max-h-1/2 lg:h-[85%] lg:max-h-[85%] overflow-hidden p-1">
      <Textarea
        name="lyrics"
        id="lyrics"
        onChange={handleOnChange}
        value={lyrics}
        placeholder="Enter your chants / lyrics here..."
        className="text-white placeholder:text-white/70 h-1/2 w-full max-h-1/2 overflow-y-auto resize-none"
      />
    </div>
  );
}

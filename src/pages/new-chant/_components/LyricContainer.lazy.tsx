import { createLazyFileRoute } from "@tanstack/react-router";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/atoms/Tabs";
import InputLyrics from "./InputLyrics.lazy";
import SyncLyrics from "./SyncLyrics.lazy";
import { useLyricsStore } from "@/store/useLyricsStore";
import { useState } from "react";
import { useNavStore } from "@/store/useNavStore";
import WordByWordSync from "./WordByWordSync";
import { useModal } from "@ebay/nice-modal-react";
import { WarningModal } from "@/components/moleculs/WarningModal";

export const Route = createLazyFileRoute(
  "/new-chant/_components/LyricContainer"
)({
  component: LyricContainer,
});

export default function LyricContainer() {
  const { staticLyrics } = useLyricsStore();
  const [tabValue, setTabValue] = useState<string>("lyrics");
  const { currentNav, setCurrentNav } = useNavStore();

  const handleTabsChange = (value: string) => {
    if (value === "sync" && staticLyrics.length < 1) {
      return;
    }

    setTabValue(value);
  };

  const warningModal = useModal(WarningModal);

  const onClickWordbyWord = () => {
    void warningModal.show({
      onConfirm: () => setCurrentNav("word"),
      title: "Mobile Experience Recommended",
      warningMessage:
        "For the optimal word-by-word lyric synchronization experience, we recommend using a mobile device. This feature is designed to work best on smaller screens for enhanced readability and synchronization accuracy.",
    });
  };

  return (
    <Tabs
      onValueChange={handleTabsChange}
      value={tabValue}
      defaultValue="lyrics"
      className="overflow-y-hidden h-full"
    >
      <TabsList>
        <TabsTrigger value="lyrics">Chants</TabsTrigger>
        <TabsTrigger
          className={`${staticLyrics.length < 1 ? "cursor-not-allowed" : ""}`}
          value="sync"
        >
          Sync
        </TabsTrigger>
      </TabsList>
      <TabsContent className="h-screen" value="lyrics">
        <InputLyrics />
      </TabsContent>
      <TabsContent className="h-screen" value="sync">
        {currentNav === null ? (
          <div className="container w-full h-full flex flex-col items-center justify-center gap-5">
            <button
              className="bg-white text-black p-2 rounded-lg hover:bg-white/55 cursor-pointer"
              onClick={() => setCurrentNav("line")}
            >
              Sync Line by Line
            </button>

            <button
              className="bg-white text-black p-2 rounded-lg hover:bg-white/55 cursor-pointer"
              onClick={onClickWordbyWord}
            >
              Sync Word by Word
            </button>
          </div>
        ) : currentNav === "line" ? (
          <SyncLyrics />
        ) : (
          <WordByWordSync />
        )}
      </TabsContent>
    </Tabs>
  );
}

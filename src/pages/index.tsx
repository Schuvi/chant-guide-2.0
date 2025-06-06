import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/atoms/Card";
import { Badge } from "@/components/atoms/Badge";
import { Input } from "@/components/atoms/Input";
import { ChantData } from "@/Constants/ChantData";
import SpatialAudioIcon from "@mui/icons-material/SpatialAudio";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/atoms/Popover";
import { BottomNav } from "@/components/moleculs/BottomNav";

export const Route = createFileRoute("/")({
  component: IndexComponent,
});

function IndexComponent() {
  const navigate = useNavigate();

  const handleCardClick = (id: string) => {
    navigate({ to: `/chant/${id}` });
  };

  return (
    <>
      <div className="container flex justify-between">
        <div className="flex gap-3">
          <Popover>
            <PopoverTrigger>
              <Badge
                content={
                  <>
                    <TuneIcon sx={{ color: "white" }} />
                  </>
                }
              />
            </PopoverTrigger>
            <PopoverContent>Test</PopoverContent>
          </Popover>
        </div>

        <Input
          startIcon={<SearchIcon sx={{ color: "white" }} />}
          className="input w-52"
          placeholder="Search chant here..."
        />
      </div>

      <h1 className="my-8 text-2xl font-bold text-white">
        <SpatialAudioIcon fontSize="large" /> Chant
      </h1>

      <div className="container flex justify-center">
        <div className="container grid grid-cols-1 gap-5">
          {ChantData.map((item) => (
            <div className="flex justify-center">
              <Card
                key={item.id}
                className="w-full border-none cursor-pointer group"
                onClick={() => handleCardClick(item.id)}
              >
                <CardContent className="bg-[#353a3e] rounded-lg h-full flex pt-6 pr-0 text-wrap">
                  <img
                    src={item.image}
                    alt="image"
                    className="w-28 h-28 object-cover rounded-lg transition-transform duration-300 group-hover:scale-110"
                  />

                  <div className="container ml-5 bg-transparent flex flex-col justify-center max-w-full w-full">
                    <h1 className="bg-transparent text-white text-md text-ellipsis overflow-hidden w-full">
                      {item.chantTitle}
                    </h1>

                    <h3 className="bg-transparent text-white text-sm">
                      Author : {item.author}
                    </h3>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

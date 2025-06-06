import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/atoms/Card";
import { Badge } from "@/components/atoms/Badge";
import { DynamicIcon } from "@/components/atoms/DynamicIcon";
import { Input } from "@/components/atoms/Input";
import { ChantData } from "@/Constants/ChantData";
import SpatialAudioIcon from "@mui/icons-material/SpatialAudio";
import SearchIcon from "@mui/icons-material/Search";

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
          <Badge
            content={
              <>
                <h1>All</h1>
              </>
            }
          />
          <Badge
            content={
              <>
                <h1>Recent</h1>
              </>
            }
          />
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

      <div className="container flex gap-5">
        {ChantData.map((item) => (
          <Card
            key={item.id}
            className="max-h-80 w-80 border-none cursor-pointer group"
            onClick={() => handleCardClick(item.id)}
          >
            <CardContent className="bg-[#353a3e] rounded-lg h-full flex pt-6 text-wrap">
              <img
                src={item.image}
                alt="image"
                className="w-28 h-28 object-cover rounded-lg transition-transform duration-300 group-hover:scale-110"
              />

              <div className="container ml-5 bg-transparent flex flex-col justify-center max-w-full w-full">
                <h1 className="bg-transparent text-white text-md text-ellipsis overflow-hidden w-10/12">
                  {item.chantTitle}
                </h1>

                <h3 className="bg-transparent text-white text-sm">
                  Author : {item.author}
                </h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}

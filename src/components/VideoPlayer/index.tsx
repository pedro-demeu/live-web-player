import { useState } from "react";
import { useVideoJS } from "../../hooks/useVideoJS";
import ErrorBoundary from "../ErrorBoundary";
import LiveStreamInput from "../LiveStreamInput";
import React from "react";

const VideoPlayer = () => {
  const [source, setSource] = useState("");
  const { VideoJS, player } = useVideoJS({
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    muted: true,
    sources: [
      {
        src: source,
        type: "application/x-mpegURL",
      },
    ],
    children: ["MediaLoader"],
  });

  React.useEffect(() => {
    player.current?.on("playing", () => {
      console.log("reproduzindo...");
    });
  }, [player]);

  const handlePlay = ({ url }: { url: string }) => {
    setSource(url);
  };

  return (
    <ErrorBoundary>
      {!source && <LiveStreamInput onSubmit={handlePlay} />}
      {source && <VideoJS src={source} />}
    </ErrorBoundary>
  );
};
export default VideoPlayer;

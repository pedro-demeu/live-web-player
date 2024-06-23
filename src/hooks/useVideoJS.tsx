import * as React from "react";
import videojs from "video.js";
import VideoJsPlayer from "video.js/dist/types/player";
import "video.js/dist/video-js.css";

import { Loading } from "../components";
import { useRef } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useVideoJS = (videoJsOptions: any) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const player = React.useRef<VideoJsPlayer>(null);
  const [loading, setLoading] = React.useState(true);
  const retry = useRef(0);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const retryTimeoutId = useRef<NodeJS.Timeout | 0>(0);

  React.useEffect(() => {
    if (!videoRef.current) {
      console.error("videoRef.current is not defined");
      return;
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    player.current = videojs(videoRef.current, videoJsOptions);

    player.current?.ready(function r() {
      if (videoJsOptions.sources && player.current) {
        player.current.src(videoJsOptions.sources[0]);
      }
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    player.current?.on("error", (e: any) => {
      e.stopImmediatePropagation();
      if (videoJsOptions.sources?.some(({ src }: { src: string }) => !!src)) {
        if (retry.current < 100) {
          retryTimeoutId.current = setTimeout(() => {
            if (!player.current) return;
            const videoError = player.current.error();
            retry.current += 1;
            // eslint-disable-next-line no-console
            console.error(`Retrying ${retry.current}`, videoError);
            player.current.reset();
            player.current.src(videoJsOptions.sources);
          }, 2000);
        } else console.error("video:error_executing_video");
      }
    });

    player.current?.on("playing", () => {
      setLoading(false);
    });

    return () => {
      setTimeout(() => {
        retryTimeoutId.current && clearTimeout(retryTimeoutId.current);
      }, 1000);
    };
  }, [videoJsOptions]);

  const VideoJS = React.useCallback(
    ({ ...props }) => {
      return (
        <>
          <button
            type="button"
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={() => window.location.reload()}
          >
            Back
          </button>
          <div
            data-vjs-player
            className="
          bg-black 
            rounded-lg 
            shadow-md 
            flex 
            items-center 
            justify-center
          "
            style={{
              width: 860,
              height: 340,
              padding: 0,
              position: "relative",
            }}
          >
            <div
              style={{
                width: 860,
                height: 340,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                padding: 0,
                position: "fixed",
                zIndex: 9999,
              }}
            >
              {loading && (
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 9999,
                  }}
                >
                  <Loading />
                </div>
              )}

              <video
                ref={videoRef}
                id="liveWebPlayer"
                className="video-js"
                {...props}
              />
            </div>
          </div>
        </>
      );
    },
    [loading]
  );
  return { VideoJS, player };
};

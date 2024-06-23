import React, { useState } from "react";
import FreePlaylistVideos from "../FreePlaylistVideos";

const LiveStreamInput: React.FC<{
  onSubmit: ({ url }: { url: string }) => void;
}> = ({ onSubmit }) => {
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      url,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto my-4 p-4 bg-white rounded-lg shadow-md"
    >
      <label
        htmlFor="liveStreamUrl"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Enter Live Stream URL
      </label>
      <input
        type="text"
        id="liveStreamUrl"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        placeholder="https://example.com/live/stream.m3u8"
        required
      />
      <button
        type="submit"
        className="mt-4 w-full px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Play
      </button>

      <FreePlaylistVideos />
    </form>
  );
};

export default LiveStreamInput;

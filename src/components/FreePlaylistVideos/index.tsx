import { useEffect, useState } from "react";

const videoUrls = [
  "http://sample.vodobox.net/skate_phantom_flex_4k/skate_phantom_flex_4k.m3u8",
  "http://playertest.longtailvideo.com/adaptive/wowzaid3/playlist.m3u8",
  "http://cdn-fms.rbs.com.br/vod/hls_sample1_manifest.m3u8",
  "http://nasatv-lh.akamaihd.net/i/NASA_101@319270/index_1000_av-p.m3u8?sd=10&rebase=on",
  "http://content.jwplatform.com/manifests/vM7nH0Kl.m3u8",
  "http://walterebert.com/playground/video/hls/sintel-trailer.m3u8",
  "http://qthttp.apple.com.edgesuite.net/1010qwoeiuryfg/sl.m3u8",
  "https://devimages.apple.com.edgekey.net/streaming/examples/bipbop_16x9/bipbop_16x9_variant.m3u8",
  "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8",
  "https://d1gnaphp93fop2.cloudfront.net/videos/multiresolution/rendition_new10.m3u8",
  "https://res.cloudinary.com/dannykeane/video/upload/sp_full_hd/q_80:qmax_90,ac_none/v1/dk-memoji-dark.m3u8",
  "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
  "https://diceyk6a7voy4.cloudfront.net/e78752a1-2e83-43fa-85ae-3d508be29366/hls/fitfest-sample-1_Ott_Hls_Ts_Avc_Aac_16x9_1280x720p_30Hz_6.0Mbps_qvbr.m3u8",
];

const FreePlaylistVideos = () => {
  const [showModal, setShowModal] = useState(false);
  const [copyStatus, setCopyStatus] = useState("");

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopyStatus("copied!!");
  };

  useEffect(() => {
    const interval = setTimeout(() => {
      setCopyStatus("");
    }, 3000);

    return () => clearTimeout(interval);
  }, [copyStatus]);

  return (
    <div className="max-w-2xl mx-auto py-4">
      <button
        type="button"
        className="bg-blue-500 w-full text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
        onClick={handleOpenModal}
      >
        Mostrar Playlists gratuitas para testar
      </button>
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center">
          <div className="relative bg-white max-w-lg mx-auto p-6 rounded-lg">
            <button
              className="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={handleCloseModal}
            >
              Fechar
            </button>
            <h1 className="text-2xl font-bold mb-4">Lista de URLs de Vídeos</h1>
            <p className="mb-4">{copyStatus}</p>
            <ul className="space-y-2">
              {videoUrls.map((url, index) => (
                <li
                  key={index}
                  className="bg-gray-950 p-2 rounded-lg flex justify-between items-center"
                >
                  <span className="truncate text-white">{url}</span>
                  <button
                    type="button"
                    className="ml-4 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
                    onClick={() => handleCopy(url)}
                  >
                    Copiar
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default FreePlaylistVideos;

import { Box, IconButton } from "@chakra-ui/react";
import { FiPlay, FiPause } from "react-icons/fi";
import { useRef, useState } from "react";

const AudioPlayer = ({ audioUrl }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayback = () => {
    const audioElement = audioRef.current;

    if (isPlaying) {
      audioElement.pause();
    } else {
      audioElement.play();
    }

    setIsPlaying(!isPlaying);
  };

  return (
    <Box>
      <audio ref={audioRef} src={audioUrl} />

      <IconButton
        aria-label={isPlaying ? "Pause" : "Play"}
        onClick={togglePlayback}
        icon={isPlaying ? <FiPause /> : <FiPlay />}
        size="lg"
      />
    </Box>
  );
};

export default AudioPlayer;

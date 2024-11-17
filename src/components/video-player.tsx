import { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { cn } from '../lib/utils';

interface VideoPlayerProps {
  movieId: number;
  className?: string;
}

export function VideoPlayer({ movieId, className }: VideoPlayerProps) {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [videoPath, setVideoPath] = useState<string | null>(null);
  const playerRef = useRef<ReactPlayer>(null);

  // Vérifier si le fichier existe dans le dossier local
  useEffect(() => {
    const checkVideoFile = async () => {
      const possibleExtensions = ['.mp4', '.mkv', '.avi'];
      for (const ext of possibleExtensions) {
        const path = `/videos/${movieId}${ext}`;
        try {
          const response = await fetch(path, { method: 'HEAD' });
          if (response.ok) {
            setVideoPath(path);
            break;
          }
        } catch (error) {
          console.error('Error checking video file:', error);
        }
      }
    };

    checkVideoFile();
  }, [movieId]);

  if (!videoPath) {
    return (
      <div className={cn('flex aspect-video items-center justify-center bg-black', className)}>
        <p className="text-lg text-gray-400">Aucun fichier vidéo trouvé</p>
      </div>
    );
  }

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setMuted(newVolume === 0);
  };

  const handleMuteToggle = () => {
    setMuted(!muted);
  };

  const handleProgress = (state: { played: number }) => {
    setProgress(state.played * 100);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setProgress(time);
    playerRef.current?.seekTo(time / 100);
  };

  return (
    <div className={cn('relative rounded-lg bg-black', className)}>
      <ReactPlayer
        ref={playerRef}
        url={videoPath}
        width="100%"
        height="100%"
        playing={playing}
        volume={volume}
        muted={muted}
        onProgress={handleProgress}
        progressInterval={1000}
        className="aspect-video"
      />

      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 p-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={handlePlayPause}
            className="rounded-full bg-white/20 p-2 hover:bg-white/30"
          >
            {playing ? (
              <Pause className="h-6 w-6" />
            ) : (
              <Play className="h-6 w-6" />
            )}
          </button>

          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleSeek}
            className="flex-1 cursor-pointer"
          />

          <div className="flex items-center space-x-2">
            <button
              onClick={handleMuteToggle}
              className="rounded-full bg-white/20 p-2 hover:bg-white/30"
            >
              {muted ? (
                <VolumeX className="h-6 w-6" />
              ) : (
                <Volume2 className="h-6 w-6" />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
              className="w-24 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
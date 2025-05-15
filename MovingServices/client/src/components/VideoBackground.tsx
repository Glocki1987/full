import { useState, useEffect } from 'react';

interface VideoBackgroundProps {
  videoUrl: string;
  fallbackImageUrl?: string;
}

const VideoBackground = ({ videoUrl, fallbackImageUrl }: VideoBackgroundProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Reset state when video URL changes
    setIsLoaded(false);
    setHasError(false);
  }, [videoUrl]);

  const handleVideoLoaded = () => {
    setIsLoaded(true);
  };

  const handleVideoError = () => {
    console.error('Video failed to load:', videoUrl);
    setHasError(true);
  };

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
      {!hasError ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          className={`object-cover w-full h-full transition-opacity duration-700 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoadedData={handleVideoLoaded}
          onError={handleVideoError}
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : fallbackImageUrl ? (
        <img 
          src={fallbackImageUrl} 
          alt="Transport background" 
          className="object-cover w-full h-full"
        />
      ) : null}
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-10"></div>
    </div>
  );
};

export default VideoBackground;
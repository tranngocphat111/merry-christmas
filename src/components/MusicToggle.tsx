import { motion } from 'framer-motion';
import { Music, Volume2, VolumeX } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

interface MusicToggleProps {
  autoPlay?: boolean;
}

export const MusicToggle = ({ autoPlay = false }: MusicToggleProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      // Set volume
      audioRef.current.volume = 0.5;
      
      // Add error listener
      audioRef.current.addEventListener('error', (e) => {
        console.error('Audio error:', e);
        setError('Failed to load audio');
      });
      
      audioRef.current.addEventListener('canplay', () => {
        console.log('Audio can play');
        setError(null);
      });
    }
  }, []);

  useEffect(() => {
    if (autoPlay && audioRef.current && !hasInteracted) {
      // Try to play, but handle autoplay restrictions
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setHasInteracted(true);
          })
          .catch((error) => {
            // Autoplay was prevented, wait for user interaction
            console.log('Autoplay prevented, waiting for user interaction:', error);
            
            // Add click listener to start music on any user interaction
            const startOnInteraction = () => {
              if (audioRef.current && autoPlay && !hasInteracted) {
                audioRef.current.play()
                  .then(() => {
                    setIsPlaying(true);
                    setHasInteracted(true);
                  })
                  .catch(err => console.log('Still cannot play:', err));
              }
              document.removeEventListener('click', startOnInteraction);
            };
            
            document.addEventListener('click', startOnInteraction, { once: true });
          });
      }
    }
  }, [autoPlay, hasInteracted]);

  const toggleMusic = () => {
    console.log('Toggle music clicked');
    if (audioRef.current) {
      console.log('Audio element exists, current state:', { 
        paused: audioRef.current.paused, 
        readyState: audioRef.current.readyState,
        networkState: audioRef.current.networkState,
        src: audioRef.current.currentSrc 
      });
      
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
        console.log('Paused music');
      } else {
        const playPromise = audioRef.current.play();
        console.log('Attempting to play...');
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log('Music playing successfully');
              setIsPlaying(true);
              setHasInteracted(true);
            })
            .catch((error) => {
              console.error('Playback failed:', error);
              setError(error.message);
            });
        }
      }
    } else {
      console.error('Audio element not found');
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        loop
        preload="auto"
        src="/Last Christmas.mp3"
      />
      
      <motion.button
        initial={{ scale: 0 }}
        animate={{ 
          scale: 1,
          boxShadow: isPlaying 
            ? ['0 0 20px rgba(255,215,0,0.5)', '0 0 40px rgba(255,215,0,0.8)', '0 0 20px rgba(255,215,0,0.5)']
            : '0 10px 30px rgba(0,0,0,0.3)',
        }}
        transition={{ 
          scale: { delay: 0.5, type: 'spring', stiffness: 200 },
          boxShadow: { duration: 2, repeat: Infinity },
        }}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.85 }}
        onClick={toggleMusic}
        aria-label="Toggle music"
        title={error || (isPlaying ? 'Tắt nhạc' : 'Bật nhạc')}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 99999,
          padding: '15px',
          borderRadius: '50%',
          border: '2px solid rgba(255,255,255,0.3)',
          cursor: 'pointer',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
          background: error 
            ? 'linear-gradient(135deg, rgba(255,0,0,0.5), rgba(139,0,0,0.5))'
            : isPlaying 
              ? 'linear-gradient(135deg, rgba(255,215,0,0.5), rgba(220,20,60,0.5))'
              : 'rgba(255,255,255,0.15)',
        }}
      >
        <div className="relative">
          {isPlaying ? (
            <Volume2 style={{ width: '28px', height: '28px', color: 'white', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }} />
          ) : (
            <VolumeX style={{ width: '28px', height: '28px', color: 'rgba(255,255,255,0.8)', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }} />
          )}
          
          {isPlaying && (
            <>
              <motion.div
                className="absolute -inset-3 border-2 border-christmas-gold rounded-full"
                animate={{ scale: [1, 1.4, 1], opacity: [0.8, 0, 0.8] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <motion.div
                className="absolute -inset-2 bg-christmas-gold/20 rounded-full"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              />
            </>
          )}
        </div>

        {/* Music note animation */}
        {isPlaying && (
          <>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute -top-1 left-1/2"
                initial={{ opacity: 0, y: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  y: [-20, -40],
                  x: [0, (i - 1) * 10],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              >
                <Music className="w-4 h-4 text-christmas-gold" />
              </motion.div>
            ))}
          </>
        )}
      </motion.button>
    </>
  );
};

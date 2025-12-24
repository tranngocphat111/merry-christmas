import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Snowfall } from './components/Snowfall';
import { RosePetals } from './components/RosePetals';
import { GiftBox } from './components/GiftBox';
import { MusicToggle } from './components/MusicToggle';
import { GreetingCard } from './components/GreetingCard';

function App() {
  const [isGiftOpened, setIsGiftOpened] = useState(false);
  // Hardcoded photo path
  const userPhoto = '/girlfriend.jpg';

  const handleGiftOpen = () => {
    // Epic confetti explosion
    const duration = 4 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 80, zIndex: 999 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 80 * (timeLeft / duration);

      // Gold confetti from left
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#FFD700', '#FFA500', '#FF6347', '#FFE4B5'],
        shapes: ['circle', 'square'],
        scalar: randomInRange(0.8, 1.4),
      });

      // Red/Pink confetti from right
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#DC143C', '#FF1493', '#FF69B4', '#FFB6C1'],
        shapes: ['circle', 'square'],
        scalar: randomInRange(0.8, 1.4),
      });

      // Hearts from center
      confetti({
        ...defaults,
        particleCount: particleCount / 2,
        origin: { x: 0.5, y: 0.5 },
        colors: ['#FF1493', '#FF69B4'],
        shapes: ['circle'],
        scalar: randomInRange(1.2, 2),
      });
    }, 200);

    // Delay showing card for dramatic effect
    setTimeout(() => {
      setIsGiftOpened(true);
    }, 800);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-christmas-blue via-purple-900 to-christmas-red">
      {/* Background effects */}

      {/* Particle effects */}
      <Snowfall />
      <RosePetals />

      {/* Animated gradient overlay */}
      <motion.div
        className="fixed inset-0 z-0 opacity-20"
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, rgba(220,20,60,0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 50%, rgba(255,215,0,0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 50% 80%, rgba(138,43,226,0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 50%, rgba(220,20,60,0.3) 0%, transparent 50%)',
          ],
        }}
        transition={{ duration: 15, repeat: Infinity }}
      />

      {/* Content */}
      <AnimatePresence mode="wait">
        {!isGiftOpened ? (
          <motion.div
            key="gift"
            exit={{
              opacity: 0,
              scale: 0.3,
              rotateY: 180,
            }}
            transition={{ duration: 0.8 }}
          >
            <GiftBox onOpen={handleGiftOpen} />
          </motion.div>
        ) : (
          <motion.div
            key="card"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1,
              type: 'spring',
              stiffness: 100,
            }}
          >
            <GreetingCard photo={userPhoto} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative elements - floating emojis */}
      <motion.div
        className="fixed top-10 left-10 text-4xl md:text-6xl z-0 pointer-events-none"
        animate={{
          opacity: [0.3, 1, 0.3],
          scale: [1, 1.2, 1],
          rotate: [0, 10, 0],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        ⭐
      </motion.div>

      <motion.div
        className="fixed top-20 right-20 text-3xl md:text-5xl z-0 pointer-events-none"
        animate={{
          opacity: [0.3, 1, 0.3],
          scale: [1, 1.3, 1],
          rotate: [0, -15, 0],
        }}
        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
      >
        ✨
      </motion.div>

      <motion.div
        className="fixed bottom-20 left-20 text-3xl md:text-5xl z-0 pointer-events-none"
        animate={{
          opacity: [0.3, 1, 0.3],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
      >
        🎄
      </motion.div>

      <motion.div
        className="fixed bottom-32 right-32 text-2xl md:text-4xl z-0 pointer-events-none"
        animate={{
          opacity: [0.3, 1, 0.3],
          rotate: [0, 20, 0],
          scale: [1, 1.4, 1],
        }}
        transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
      >
        🔔
      </motion.div>

      <motion.div
        className="fixed top-1/2 left-10 text-3xl md:text-4xl z-0 pointer-events-none"
        animate={{
          opacity: [0.4, 1, 0.4],
          scale: [1, 1.3, 1],
          y: [-10, 10, -10],
        }}
        transition={{ duration: 4, repeat: Infinity, delay: 0.8 }}
      >
        💝
      </motion.div>

      <motion.div
        className="fixed top-1/2 right-10 text-3xl md:text-4xl z-0 pointer-events-none"
        animate={{
          opacity: [0.4, 1, 0.4],
          scale: [1, 1.2, 1],
          rotate: [0, -20, 0],
        }}
        transition={{ duration: 3.5, repeat: Infinity, delay: 2 }}
      >
        🌟
      </motion.div>

      {/* Music toggle - Always on top */}
      <MusicToggle autoPlay={true} />
    </div>
  );
}

export default App;

import { motion } from 'framer-motion';
import { Sparkles as SparklesIcon } from 'lucide-react';
import { useState } from 'react';

interface GiftBoxProps {
  onOpen: () => void;
}

export const GiftBox = ({ onOpen }: GiftBoxProps) => {
  const [isShaking, setIsShaking] = useState(false);

  const handleClick = () => {
    setIsShaking(true);
    setTimeout(() => {
      onOpen();
    }, 800);
  };

  return (
    <div style={{ 
      position: 'relative', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh',
      padding: '16px'
    }}>
      <motion.div
        initial={{ scale: 0, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        transition={{
          type: 'spring',
          stiffness: 150,
          damping: 15,
        }}
        style={{ position: 'relative', zIndex: 50 }}
      >
        {/* Glow */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '24px',
            filter: 'blur(50px)',
          }}
          animate={{
            background: [
              'radial-gradient(circle, rgba(255,215,0,0.6) 0%, transparent 70%)',
              'radial-gradient(circle, rgba(220,20,60,0.6) 0%, transparent 70%)',
              'radial-gradient(circle, rgba(255,215,0,0.6) 0%, transparent 70%)',
            ],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        {/* Gift Box */}
        <motion.div
          animate={isShaking ? {
            rotate: [-5, 5, -5, 5, 0],
            scale: [1, 1.05, 1],
          } : {
            y: [0, -10, 0],
          }}
          transition={isShaking ? {
            duration: 0.6,
          } : {
            duration: 2.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          onClick={handleClick}
          onTouchStart={handleClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            position: 'relative',
            cursor: 'pointer',
            width: '350px',
            height: '350px',
            backgroundColor: '#DC143C',
            border: '10px solid #8B0000',
            borderRadius: '20px',
            boxShadow: '0 0 80px rgba(220,20,60,1), 0 30px 60px rgba(0,0,0,0.5), inset 0 0 40px rgba(0,0,0,0.3)',
            touchAction: 'manipulation',
          }}
        >
          {/* Vertical ribbon */}
          <div style={{ 
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '60px',
            height: '100%',
            backgroundColor: '#FFD700',
            boxShadow: '0 0 30px rgba(255,215,0,0.8), inset 0 2px 10px rgba(255,255,255,0.5)',
          }} />
          
          {/* Horizontal ribbon */}
          <div style={{ 
            position: 'absolute',
            top: '50%',
            left: 0,
            transform: 'translateY(-50%)',
            width: '100%',
            height: '60px',
            backgroundColor: '#FFD700',
            boxShadow: '0 0 30px rgba(255,215,0,0.8), inset 0 2px 10px rgba(255,255,255,0.5)',
          }} />

          {/* Bow center */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 20,
          }}>
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ position: 'relative', width: '120px', height: '120px' }}
            >
              {/* Left loop */}
              <div style={{ 
                position: 'absolute',
                top: '50%',
                left: 0,
                width: '90px',
                height: '40px',
                borderRadius: '50%',
                transform: 'rotate(-45deg)',
                backgroundColor: '#FFD700',
                boxShadow: '0 0 25px rgba(255,215,0,1), inset 0 2px 8px rgba(255,255,255,0.6)',
                border: '3px solid #FFA500',
              }} />
              
              {/* Right loop */}
              <div style={{ 
                position: 'absolute',
                top: '50%',
                right: 0,
                width: '90px',
                height: '40px',
                borderRadius: '50%',
                transform: 'rotate(45deg)',
                backgroundColor: '#FFD700',
                boxShadow: '0 0 25px rgba(255,215,0,1), inset 0 2px 8px rgba(255,255,255,0.6)',
                border: '3px solid #FFA500',
              }} />
              
              {/* Knot */}
              <motion.div 
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{ 
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '55px',
                  height: '55px',
                  borderRadius: '50%',
                  backgroundColor: '#FFD700',
                  boxShadow: '0 0 35px rgba(255,215,0,1), inset 0 2px 10px rgba(255,255,255,0.8)',
                  border: '4px solid #FF8C00',
                }}
              >
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 100%)',
                  borderRadius: '50%',
                }} />
              </motion.div>

              {/* Tails */}
              <div style={{ 
                position: 'absolute',
                top: '100%',
                left: '50%',
                transform: 'translateX(-32px)',
                width: '20px',
                height: '48px',
                backgroundColor: '#FFD700',
                clipPath: 'polygon(50% 0%, 0% 0%, 100% 100%)',
                boxShadow: '0 5px 15px rgba(255,215,0,0.8)',
              }} />
              <div style={{ 
                position: 'absolute',
                top: '100%',
                left: '50%',
                transform: 'translateX(12px)',
                width: '20px',
                height: '48px',
                backgroundColor: '#FFD700',
                clipPath: 'polygon(50% 0%, 100% 0%, 0% 100%)',
                boxShadow: '0 5px 15px rgba(255,215,0,0.8)',
              }} />
            </motion.div>
          </div>

          {/* Sparkles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              style={{
                position: 'absolute',
                left: `${15 + Math.random() * 70}%`,
                top: `${15 + Math.random() * 70}%`,
                width: Math.random() > 0.5 ? '6px' : '3px',
                height: Math.random() > 0.5 ? '6px' : '3px',
                borderRadius: '50%',
                backgroundColor: Math.random() > 0.5 ? '#FFD700' : '#FFF',
                boxShadow: `0 0 ${Math.random() * 10 + 10}px currentColor`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: 2 + Math.random(),
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}

          {/* Shine */}
          <div style={{ 
            position: 'absolute', 
            inset: 0, 
            borderRadius: '20px', 
            overflow: 'hidden', 
            pointerEvents: 'none' 
          }}>
            <motion.div
              style={{ position: 'absolute', inset: 0 }}
              animate={{
                background: [
                  'linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
                  'linear-gradient(135deg, transparent 0%, rgba(255,255,255,0) 50%, transparent 100%)',
                ],
                x: ['-100%', '200%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          </div>
        </motion.div>

        {/* Orbiting sparkles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`orbit-${i}`}
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              marginLeft: '-6px',
              marginTop: '-6px',
            }}
            animate={{
              rotate: [0, 360],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              rotate: { duration: 5, repeat: Infinity, ease: 'linear' },
              scale: { duration: 2, repeat: Infinity, delay: i * 0.25 },
            }}
          >
            <div
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: '#FFD700',
                transform: `translate(${Math.cos((i * Math.PI * 2) / 8) * 140}px, ${Math.sin((i * Math.PI * 2) / 8) * 140}px)`,
                boxShadow: '0 0 20px rgba(255,215,0,0.9)',
              }}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Text */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 1 }}
        style={{
          marginTop: '64px',
          textAlign: 'center',
          padding: '0 16px',
          pointerEvents: 'none',
        }}
      >
        <motion.p
          style={{
            fontSize: '48px',
            color: 'white',
            fontFamily: 'Georgia, serif',
            marginBottom: '24px',
            fontWeight: 'bold',
          }}
          animate={{
            textShadow: [
              '0 0 30px rgba(255,215,0,1), 0 0 60px rgba(255,215,0,0.6)',
              '0 0 40px rgba(220,20,60,1), 0 0 80px rgba(220,20,60,0.6)',
              '0 0 30px rgba(255,215,0,1), 0 0 60px rgba(255,215,0,0.6)',
            ],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          Chạm vào món quà dành đi Béee
        </motion.p>
        
        <motion.div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            color: 'white',
            marginTop: '16px',
          }}
          animate={{ 
            y: [0, -10, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <SparklesIcon style={{ width: '32px', height: '32px', color: '#FFD700' }} />
          <span style={{ fontSize: '32px', fontWeight: '600' }}>TAP TO OPEN</span>
          <SparklesIcon style={{ width: '32px', height: '32px', color: '#FFD700' }} />
        </motion.div>
      </motion.div>

      {/* Circles */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`circle-${i}`}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: '50%',
            border: '2px solid rgba(255, 215, 0, 0.2)',
            pointerEvents: 'none',
            width: `${200 + i * 120}px`,
            height: `${200 + i * 120}px`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0, 0.4],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            delay: i * 1.5,
          }}
        />
      ))}
    </div>
  );
};

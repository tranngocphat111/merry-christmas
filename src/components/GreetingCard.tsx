import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

interface GreetingCardProps {
  photo?: string;
}

export const GreetingCard = ({ photo }: GreetingCardProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [showQuote, setShowQuote] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const textContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const quote = "Em là món quà Giáng sinh đẹp nhất của anh";

const fullText = `Giáng sinh an lành nhé bé 🎄

Năm nay mình không đi chơi chung được và cũng không có quà tặng em, nhưng anh vẫn muốn gửi đến em những điều tốt đẹp nhất. Cảm ơn em đã luôn ở đó và làm mỗi ngày của anh thêm ý nghĩa.

Chúc em một Giáng sinh ấm áp, vui vẻ. Mong sớm được gặp lại em.

Merry Christmas ❤️

— Anh bé`;

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText(fullText.slice(0, index + 1));
        index++;
        // Scroll viewport to keep text in view
        if (textContainerRef.current && index % 10 === 0) {
          textContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      } else {
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const quoteTimer = setInterval(() => {
      setShowQuote(prev => !prev);
    }, 5000);
    return () => clearInterval(quoteTimer);
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: isMobile ? '60px 10px 80px 10px' : '80px 20px 40px 20px',
      position: 'relative',
      background: 'radial-gradient(circle at 20% 20%, rgba(139,0,0,0.2), transparent 40%), radial-gradient(circle at 80% 80%, rgba(25,25,112,0.2), transparent 40%), radial-gradient(circle at 50% 50%, rgba(255,215,0,0.05), transparent 60%)',
      overflow: 'hidden',
    }}>
      {/* Animated gradient orbs - Optimized */}
      <motion.div
        style={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(220,20,60,0.25), transparent 70%)',
          filter: 'blur(60px)',
          willChange: 'transform',
        }}
        animate={{
          x: [0, 80, 0],
          y: [0, 40, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '5%',
          width: '250px',
          height: '250px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,215,0,0.2), transparent 70%)',
          filter: 'blur(60px)',
          willChange: 'transform',
        }}
        animate={{
          x: [0, -60, 0],
          y: [0, -50, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />
      
      {/* Premium floating particles - Optimized */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: Math.random() > 0.7 ? '4px' : '2px',
            height: Math.random() > 0.7 ? '4px' : '2px',
            borderRadius: '50%',
            background: Math.random() > 0.5 ? 'linear-gradient(135deg, #FFD700, #FFA500)' : 'linear-gradient(135deg, #FF69B4, #FFB6C1)',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            boxShadow: '0 0 10px currentColor',
            willChange: 'transform, opacity',
          }}
          animate={{
            y: [0, -60, 0],
            opacity: [0, 0.8, 0],
            scale: [0, 1.2, 0],
          }}
          transition={{
            duration: 5 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 4,
            ease: 'linear',
          }}
        />
      ))}
      
      {/* Floating hearts decoration - Optimized */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`heart-bg-${i}`}
          style={{
            position: 'absolute',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 0.3, 0],
            rotate: [0, 15, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        >
          <Heart style={{ width: '20px', height: '20px', color: '#FFB6C1', fill: '#FFB6C1', opacity: 0.3 }} />
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        style={{
          position: 'relative',
          maxWidth: '1200px',
          width: '100%',
        }}
      >
        {/* Floating quote banner */}
        <AnimatePresence>
          {showQuote && (
            <motion.div
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              transition={{ duration: 0.6 }}
              style={{
                position: 'fixed',
                top: isMobile ? '8px' : '20px',
                left: isMobile ? '5%' : '50%',
                transform: isMobile ? 'none' : 'translateX(-50%)',
                zIndex: 40,
                width: isMobile ? '90%' : '85%',
                maxWidth: isMobile ? 'calc(100vw - 10%)' : '600px',
                textAlign: 'center',
              }}
            >
              <motion.div 
                style={{
                  background: 'linear-gradient(135deg, rgba(220,20,60,0.98), rgba(139,0,0,0.98))',
                  backdropFilter: 'blur(30px)',
                  padding: isMobile ? '10px 15px' : '25px 50px',
                  borderRadius: isMobile ? '30px' : '60px',
                  boxShadow: '0 25px 70px rgba(220,20,60,0.6), 0 10px 40px rgba(0,0,0,0.4), 0 0 100px rgba(255,215,0,0.4), inset 0 1px 2px rgba(255,255,255,0.3)',
                  border: isMobile ? '2px solid rgba(255,215,0,0.5)' : '3px solid rgba(255,215,0,0.5)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 30px 80px rgba(220,20,60,0.6), 0 0 120px rgba(255,215,0,0.4)',
                }}
              >
                {/* Shimmer effect */}
                <motion.div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                  }}
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                />
                <p style={{
                  color: '#FFD700',
                  fontSize: isMobile ? '11px' : '22px',
                  fontWeight: '700',
                  margin: 0,
                  fontFamily: 'Georgia, serif',
                  textShadow: '0 0 30px rgba(255,215,0,0.8), 0 2px 20px rgba(0,0,0,0.5)',
                  letterSpacing: isMobile ? '0.2px' : '0.8px',
                  position: 'relative',
                  zIndex: 1,
                  padding: isMobile ? '0 3px' : '0',
                  wordBreak: 'keep-all',
                  lineHeight: isMobile ? '1.2' : '1.5',
                }}>
                  ✨ {quote} ✨
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main card container - Ultra Premium */}
        <motion.div 
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,1), rgba(255,250,250,0.98))',
            backdropFilter: 'blur(50px)',
            borderRadius: '35px',
            overflow: 'hidden',
            boxShadow: '0 80px 160px rgba(0,0,0,0.5), 0 40px 80px rgba(139,0,0,0.3), 0 20px 40px rgba(255,215,0,0.2), 0 0 0 1px rgba(255,255,255,0.8), inset 0 2px 4px rgba(255,255,255,0.9)',
            border: '3px solid rgba(255,215,0,0.4)',
            position: 'relative',
            transform: 'translateZ(0)',
          }}
          whileHover={{
            boxShadow: '0 90px 180px rgba(0,0,0,0.55), 0 50px 100px rgba(139,0,0,0.35), 0 30px 60px rgba(255,215,0,0.25), 0 0 0 1px rgba(255,255,255,0.9)',
            scale: 1.01,
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Decorative corner patterns */}
          <div style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '200px',
            height: '200px',
            background: 'radial-gradient(circle at top right, rgba(255,215,0,0.1), transparent 60%)',
            pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '200px',
            height: '200px',
            background: 'radial-gradient(circle at bottom left, rgba(220,20,60,0.08), transparent 60%)',
            pointerEvents: 'none',
          }} />

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: 0,
          }}>
            {/* Photo section */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              style={{
                position: 'relative',
                minHeight: '500px',
                overflow: 'hidden',
              }}
            >
              {/* Premium gradient overlays */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(135deg, transparent 0%, rgba(220,20,60,0.15) 100%)',
                pointerEvents: 'none',
              }} />
              <motion.div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(45deg, transparent 0%, rgba(255,215,0,0.1) 50%, transparent 100%)',
                  pointerEvents: 'none',
                }}
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />

              {/* Photo */}
              {photo ? (
                <motion.img
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1 }}
                  src={photo}
                  alt="Love"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    position: 'relative',
                    zIndex: 1,
                  }}
                />
              ) : (
                <div style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'linear-gradient(135deg, #FFB6C1, #FF69B4)',
                  position: 'relative',
                  zIndex: 1,
                }}>
                  <Heart style={{ 
                    width: '120px', 
                    height: '120px', 
                    color: 'rgba(255,255,255,0.5)',
                    fill: 'rgba(255,255,255,0.2)',
                  }} />
                </div>
              )}

              {/* Premium decorative label */}
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                whileHover={{ scale: 1.05 }}
                style={{
                  position: 'absolute',
                  bottom: window.innerWidth > 768 ? '30px' : '15px',
                  left: window.innerWidth > 768 ? '30px' : '15px',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.98), rgba(255,250,250,0.95))',
                  padding: window.innerWidth > 768 ? '18px 35px' : '12px 20px',
                  borderRadius: '60px',
                  boxShadow: '0 15px 50px rgba(0,0,0,0.3), 0 0 30px rgba(255,215,0,0.2)',
                  border: '2px solid rgba(255,215,0,0.3)',
                  backdropFilter: 'blur(10px)',
                  zIndex: 2,
                  maxWidth: 'calc(100% - 30px)',
                }}
              >
                <p style={{
                  margin: 0,
                  background: 'linear-gradient(135deg, #8B0000, #DC143C)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontSize: window.innerWidth > 768 ? '17px' : '14px',
                  fontWeight: '800',
                  letterSpacing: window.innerWidth > 768 ? '2px' : '1px',
                  fontFamily: 'Georgia, serif',
                  filter: 'drop-shadow(0 2px 4px rgba(139,0,0,0.2))',
                  whiteSpace: 'nowrap',
                }}>
                  CHRISTMAS 2025 💕
                </p>
              </motion.div>

              {/* Corner sparkles with glow */}
              <motion.div
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  zIndex: 2,
                }}
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.3, 1],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Sparkles style={{ 
                  width: '50px', 
                  height: '50px', 
                  color: '#FFD700', 
                  filter: 'drop-shadow(0 0 20px rgba(255,215,0,1)) drop-shadow(0 0 40px rgba(255,215,0,0.5))',
                }} />
              </motion.div>
              
              {/* Additional corner decorations */}
              <motion.div
                style={{
                  position: 'absolute',
                  top: '30px',
                  left: '30px',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #FFD700, #FFA500)',
                  boxShadow: '0 0 20px rgba(255,215,0,0.8)',
                  zIndex: 2,
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                style={{
                  position: 'absolute',
                  bottom: '30px',
                  right: '30px',
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #FF69B4, #FFB6C1)',
                  boxShadow: '0 0 20px rgba(255,105,180,0.8)',
                  zIndex: 2,
                }}
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
              />
            </motion.div>

            {/* Content section */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              style={{
                padding: window.innerWidth > 768 ? '70px' : '45px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                position: 'relative',
                background: 'linear-gradient(135deg, rgba(255,250,250,1) 0%, rgba(255,248,245,1) 50%, rgba(255,245,238,1) 100%)',
              }}
            >
              {/* Animated decorative elements */}
              <motion.div 
                style={{
                  position: 'absolute',
                  top: '30px',
                  right: '30px',
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #FFD700, #FFA500)',
                  opacity: 0.15,
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{ duration: 20, repeat: Infinity }}
              />
              <motion.div 
                style={{
                  position: 'absolute',
                  bottom: '30px',
                  left: '30px',
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #DC143C, #8B0000)',
                  opacity: 0.12,
                }}
                animate={{
                  scale: [1, 1.3, 1],
                  rotate: [0, -180, -360],
                }}
                transition={{ duration: 25, repeat: Infinity }}
              />
              
              {/* Floating mini hearts - Optimized */}
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={`mini-heart-${i}`}
                  style={{
                    position: 'absolute',
                    left: `${20 + Math.random() * 60}%`,
                    top: `${10 + Math.random() * 80}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.1, 0.3, 0.1],
                    scale: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: i * 0.4,
                  }}
                >
                  <Heart style={{ width: '12px', height: '12px', color: '#FFB6C1', fill: '#FFB6C1', opacity: 0.2 }} />
                </motion.div>
              ))}

              {/* Message content */}
              <div style={{ position: 'relative', zIndex: 1 }}>
                {/* Header */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  style={{ marginBottom: '30px' }}
                >
                  <h2 style={{
                    margin: 0,
                    fontSize: '15px',
                    fontWeight: '700',
                    background: 'linear-gradient(135deg, #8B0000, #DC143C, #FFD700)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    letterSpacing: '4px',
                    textTransform: 'uppercase',
                    marginBottom: '18px',
                    filter: 'drop-shadow(0 2px 8px rgba(139,0,0,0.2))',
                  }}>
                    Merry Christmas
                  </h2>
                  <motion.div 
                    style={{
                      width: '80px',
                      height: '4px',
                      background: 'linear-gradient(to right, #DC143C, #FFD700, #DC143C)',
                      borderRadius: '10px',
                      boxShadow: '0 2px 10px rgba(220,20,60,0.3)',
                    }}
                    animate={{
                      width: ['80px', '100px', '80px'],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </motion.div>

                {/* Premium message text */}
                <motion.div
                  ref={textContainerRef}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  style={{
                    fontSize: '17px',
                    lineHeight: '1.8',
                    color: '#2C1810',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                    whiteSpace: 'pre-wrap',
                    textShadow: '0 1px 2px rgba(0,0,0,0.05)',
                    transform: 'translateZ(0)',
                    letterSpacing: 'normal',
                    wordSpacing: 'normal',
                  }}
                >
                  {displayedText}
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.7, repeat: Infinity }}
                    style={{
                      display: 'inline-block',
                      width: '3px',
                      height: '22px',
                      background: 'linear-gradient(to bottom, #DC143C, #8B0000)',
                      marginLeft: '3px',
                      verticalAlign: 'middle',
                      borderRadius: '2px',
                      boxShadow: '0 0 10px rgba(220,20,60,0.5)',
                    }}
                  />
                </motion.div>

                {/* Premium bottom decoration */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.5 }}
                  style={{
                    marginTop: '45px',
                    display: 'flex',
                    gap: '15px',
                    alignItems: 'center',
                  }}
                >
                  {[...Array(7)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        scale: [1, 1.4, 1],
                        rotate: [0, 180, 0],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                      style={{
                        width: i === 3 ? '12px' : '10px',
                        height: i === 3 ? '12px' : '10px',
                        borderRadius: '50%',
                        background: i % 2 === 0 
                          ? 'linear-gradient(135deg, #FFD700, #FFA500)' 
                          : 'linear-gradient(135deg, #FF69B4, #FFB6C1)',
                        boxShadow: i % 2 === 0
                          ? '0 0 15px rgba(255,215,0,0.6)'
                          : '0 0 15px rgba(255,105,180,0.6)',
                      }}
                    />
                  ))}
                </motion.div>
                
                {/* Signature decoration */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2 }}
                  style={{
                    marginTop: '30px',
                    textAlign: 'center',
                    fontSize: '12px',
                    color: '#8B0000',
                    fontFamily: 'Georgia, serif',
                    fontStyle: 'italic',
                    opacity: 0.6,
                  }}
                >
                  <span style={{ letterSpacing: '2px' }}>───── ♥ ─────</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom floating hearts */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`heart-${i}`}
            style={{
              position: 'absolute',
              bottom: '-50px',
              left: `${15 + i * 15}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          >
            <Heart style={{ 
              width: '20px', 
              height: '20px', 
              color: '#FFB6C1',
              fill: '#FFB6C1',
              filter: 'drop-shadow(0 0 5px rgba(255,182,193,0.5))',
            }} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

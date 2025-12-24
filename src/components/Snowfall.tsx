import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  radius: number;
  speed: number;
  drift: number;
  rotation: number;
  rotationSpeed: number;
  type: 'snow' | 'rose';
  opacity: number;
}

export const Snowfall = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Particle[] = [];
    const numberOfSnowflakes = 100;
    const numberOfRosePetals = 50;

    // Create snowflakes
    for (let i = 0; i < numberOfSnowflakes; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 1,
        speed: Math.random() * 1 + 0.5,
        drift: Math.random() * 0.5 - 0.25,
        rotation: Math.random() * 360,
        rotationSpeed: Math.random() * 2 - 1,
        type: 'snow',
        opacity: Math.random() * 0.5 + 0.5,
      });
    }

    // Create rose petals
    for (let i = 0; i < numberOfRosePetals; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 4 + 2,
        speed: Math.random() * 0.8 + 0.3,
        drift: Math.random() * 0.8 - 0.4,
        rotation: Math.random() * 360,
        rotationSpeed: Math.random() * 4 - 2,
        type: 'rose',
        opacity: Math.random() * 0.6 + 0.4,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        ctx.save();
        
        if (particle.type === 'snow') {
          // Draw snowflake
          ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
          ctx.shadowBlur = 10;
          ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Draw rose petal
          ctx.translate(particle.x, particle.y);
          ctx.rotate((particle.rotation * Math.PI) / 180);
          ctx.fillStyle = `rgba(255, 105, 180, ${particle.opacity})`;
          ctx.shadowBlur = 8;
          ctx.shadowColor = 'rgba(255, 20, 147, 0.5)';
          
          // Draw petal shape
          ctx.beginPath();
          ctx.ellipse(0, 0, particle.radius * 1.5, particle.radius * 0.8, 0, 0, Math.PI * 2);
          ctx.fill();
          
          // Add highlight
          ctx.fillStyle = `rgba(255, 182, 193, ${particle.opacity * 0.5})`;
          ctx.beginPath();
          ctx.ellipse(-particle.radius * 0.3, -particle.radius * 0.2, particle.radius * 0.6, particle.radius * 0.4, 0, 0, Math.PI * 2);
          ctx.fill();
        }
        
        ctx.restore();

        // Update position
        particle.y += particle.speed;
        particle.x += particle.drift;
        particle.rotation += particle.rotationSpeed;

        if (particle.y > canvas.height) {
          particle.y = -10;
          particle.x = Math.random() * canvas.width;
        }

        if (particle.x > canvas.width) {
          particle.x = 0;
        } else if (particle.x < 0) {
          particle.x = canvas.width;
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-10"
    />
  );
};

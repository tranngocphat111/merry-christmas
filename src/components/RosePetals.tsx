import { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  size: number;
  speed: number;
  drift: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
}

export const RosePetals = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const petals: Petal[] = [];
    const numberOfPetals = 60;

    for (let i = 0; i < numberOfPetals; i++) {
      petals.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        size: Math.random() * 5 + 3,
        speed: Math.random() * 2 + 1,
        drift: Math.random() * 2 - 1,
        rotation: Math.random() * 360,
        rotationSpeed: Math.random() * 5 - 2.5,
        opacity: Math.random() * 0.4 + 0.6,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      petals.forEach((petal) => {
        ctx.save();
        ctx.translate(petal.x, petal.y);
        ctx.rotate((petal.rotation * Math.PI) / 180);

        // Create gradient for realistic petal
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, petal.size);
        gradient.addColorStop(0, `rgba(255, 182, 193, ${petal.opacity})`);
        gradient.addColorStop(0.5, `rgba(255, 105, 180, ${petal.opacity})`);
        gradient.addColorStop(1, `rgba(219, 39, 119, ${petal.opacity * 0.8})`);

        ctx.fillStyle = gradient;
        ctx.shadowBlur = 10;
        ctx.shadowColor = `rgba(255, 105, 180, ${petal.opacity * 0.5})`;

        // Draw heart-shaped petal
        ctx.beginPath();
        ctx.ellipse(0, 0, petal.size * 1.5, petal.size, 0, 0, Math.PI * 2);
        ctx.fill();

        // Add highlight
        ctx.fillStyle = `rgba(255, 255, 255, ${petal.opacity * 0.3})`;
        ctx.beginPath();
        ctx.ellipse(-petal.size * 0.4, -petal.size * 0.3, petal.size * 0.5, petal.size * 0.3, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();

        // Update position
        petal.y += petal.speed;
        petal.x += petal.drift * Math.sin(petal.y * 0.01);
        petal.rotation += petal.rotationSpeed;

        if (petal.y > canvas.height + 20) {
          petal.y = -20;
          petal.x = Math.random() * canvas.width;
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
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[5]"
    />
  );
};

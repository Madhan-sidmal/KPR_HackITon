import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
}

const ConnectedPlanetBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles
    const particleCount = 50;
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 2 + 1,
    }));

    // India map outline (simplified)
    const indiaOutline = [
      { x: 0.5, y: 0.2 },
      { x: 0.52, y: 0.25 },
      { x: 0.55, y: 0.3 },
      { x: 0.58, y: 0.4 },
      { x: 0.6, y: 0.5 },
      { x: 0.58, y: 0.6 },
      { x: 0.55, y: 0.7 },
      { x: 0.52, y: 0.75 },
      { x: 0.5, y: 0.8 },
      { x: 0.48, y: 0.75 },
      { x: 0.45, y: 0.7 },
      { x: 0.42, y: 0.6 },
      { x: 0.4, y: 0.5 },
      { x: 0.42, y: 0.4 },
      { x: 0.45, y: 0.3 },
      { x: 0.48, y: 0.25 },
    ];

    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.005;

      // Draw flowing gradient background
      const gradient = ctx.createLinearGradient(
        Math.sin(time) * canvas.width * 0.3,
        0,
        canvas.width,
        canvas.height
      );
      gradient.addColorStop(0, 'rgba(0, 191, 166, 0.03)'); // Teal
      gradient.addColorStop(0.5, 'rgba(56, 142, 60, 0.03)'); // Forest Green
      gradient.addColorStop(1, 'rgba(79, 195, 247, 0.02)'); // Light Blue
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw subtle India outline
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(0, 191, 166, 0.08)';
      ctx.lineWidth = 2;
      indiaOutline.forEach((point, i) => {
        const x = point.x * canvas.width;
        const y = point.y * canvas.height;
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      ctx.closePath();
      ctx.stroke();

      // Update and draw particles
      particlesRef.current.forEach((particle, i) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 191, 166, ${0.3 + Math.sin(time + i) * 0.2})`;
        ctx.fill();

        // Draw connections to nearby particles
        particlesRef.current.forEach((otherParticle, j) => {
          if (i >= j) return;

          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(0, 191, 166, ${0.1 * (1 - distance / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      // Occasional water ripple effect
      if (Math.random() > 0.98) {
        const rippleX = Math.random() * canvas.width;
        const rippleY = Math.random() * canvas.height;
        const rippleRadius = 0;
        
        const drawRipple = (radius: number) => {
          if (radius > 100) return;
          
          ctx.beginPath();
          ctx.arc(rippleX, rippleY, radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(79, 195, 247, ${0.3 * (1 - radius / 100)})`;
          ctx.lineWidth = 2;
          ctx.stroke();
          
          requestAnimationFrame(() => drawRipple(radius + 2));
        };
        
        drawRipple(rippleRadius);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
};

export default ConnectedPlanetBackground;

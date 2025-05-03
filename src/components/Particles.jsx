import React, { useEffect, useRef } from 'react';


const CanvasParticles = () => {
    const canvasRef = useRef(null);
    const mousePos = useRef({
        x: 0,
        y: 0,
        radius: 100
    });
    const particles = [];

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Create particles
        const initParticles = () => {
            particles.length = 0;
            const numberOfParticles = (canvas.width * canvas.height) / 80000;

            for (let i = 0; i < numberOfParticles; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 2 + 1,
                    speedX: Math.random() * 1 - 0.9,
                    speedY: Math.random() * 1 - 0.9,
                    opacity: Math.random() * 0.5 + 0.5
                });
            }
        };

        // Animation loop
        let animationFrameId;
        const animate = () => {
            if (!ctx || !canvas) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update and draw particles
            particles.forEach((particle, index) => {
                // Update position
                particle.x += particle.speedX;
                particle.y += particle.speedY;

                // Reset particles that go off screen
                if (particle.x > canvas.width || particle.x < 0)
                    particle.speedX = -particle.speedX;
                if (particle.y > canvas.height || particle.y < 0)
                    particle.speedY = -particle.speedY;

                // Mouse interaction
                const dx = mousePos.current.x - particle.x;
                const dy = mousePos.current.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < mousePos.current.radius) {
                    const force = (mousePos.current.radius - distance) / mousePos.current.radius;
                    const directionX = dx / distance * force;
                    const directionY = dy / distance * force;
                    particle.speedX -= directionX;
                    particle.speedY -= directionY;
                }

                // Draw particle
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        // Initialize and start animation
        initParticles();
        animate();

        // Mouse move listener
        const handleMouseMove = (e) => {
            mousePos.current.x = e.clientX;
            mousePos.current.y = e.clientY;
        };

        window.addEventListener('mousemove', handleMouseMove);

        // Cleanup
        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-screen h-screen pointer-events-none z-0"
        />
    );
};

export default CanvasParticles;
// src/components/ui/ShootingStarBackground.tsx

import React, { useEffect, useRef } from 'react';
import './ShootingStarBackground.css'; // เราจะสร้างไฟล์ CSS นี้ต่อไป

export const ShootingStarBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let stars: Star[] = [];
    const starCount = 100;

    class Star {
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      color: string;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.radius = Math.random() * 1.2;
        this.vx = (Math.random() - 0.5) * 0.5; // ความเร็วแนวนอน
        this.vy = (Math.random() - 0.5) * 0.5; // ความเร็วแนวตั้ง
        this.color = 'white';
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) {
          this.vx *= -1;
        }
        if (this.y < 0 || this.y > height) {
          this.vy *= -1;
        }
      }
    }

    const createStars = () => {
      stars = [];
      for (let i = 0; i < starCount; i++) {
        stars.push(new Star());
      }
    };

    const animate = () => {
      // เทคนิคสร้างหางดาว โดยการวาดพื้นหลังสีดำโปร่งแสงทับทุกเฟรม
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'; 
      ctx.fillRect(0, 0, width, height);
      
      stars.forEach(star => {
        star.draw();
        star.update();
      });
      
      requestAnimationFrame(animate);
    };
    
    const handleResize = () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        createStars();
    }

    window.addEventListener('resize', handleResize);
    createStars();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} id="star-canvas"></canvas>;
};
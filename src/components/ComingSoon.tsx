import React, { useEffect, useState } from 'react';
import '../styles/ComingSoon.css';

const COUNTDOWN_KEY = 'countdown_state';

interface CountdownState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const ComingSoon: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [countdown, setCountdown] = useState<CountdownState>(() => {
    const saved = localStorage.getItem(COUNTDOWN_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      days: 15,
      hours: 0,
      minutes: 0,
      seconds: 0
    };
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    const timer = setInterval(() => {
      setCountdown((prev: CountdownState) => {
        // If we've reached zero on all counts, don't decrease further
        if (prev.days === 0 && prev.hours === 0 && prev.minutes === 0 && prev.seconds === 0) {
          return prev;
        }

        let newSeconds = prev.seconds - 1;
        let newMinutes = prev.minutes;
        let newHours = prev.hours;
        let newDays = prev.days;

        // Handle second rollover
        if (newSeconds < 0) {
          newSeconds = 59;
          newMinutes -= 1;
        }

        // Handle minute rollover
        if (newMinutes < 0) {
          newMinutes = 59;
          newHours -= 1;
        }

        // Handle hour rollover
        if (newHours < 0) {
          newHours = 23;
          newDays -= 1;
        }

        // If days go negative, set everything to zero
        if (newDays < 0) {
          return {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
          };
        }

        const newState = {
          days: newDays,
          hours: newHours,
          minutes: newMinutes,
          seconds: newSeconds
        };

        // Save to localStorage
        localStorage.setItem(COUNTDOWN_KEY, JSON.stringify(newState));
        return newState;
      });
    }, 1000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="coming-soon-page">
      <div className="cyber-grid"></div>
      <div className="floating-particles">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="particle"></div>
        ))}
      </div>
      <div 
        className="content-container"
        style={{
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`
        }}
      >
        <h1 className="glitch-text" data-text="Coming Soon">Coming Soon</h1>
        <div className="countdown-container">
          <div className="countdown-item">
            <span className="number">{String(countdown.days).padStart(2, '0')}</span>
            <span className="label">Days</span>
          </div>
          <div className="countdown-item">
            <span className="number">{String(countdown.hours).padStart(2, '0')}</span>
            <span className="label">Hours</span>
          </div>
          <div className="countdown-item">
            <span className="number">{String(countdown.minutes).padStart(2, '0')}</span>
            <span className="label">Minutes</span>
          </div>
          <div className="countdown-item">
            <span className="number">{String(countdown.seconds).padStart(2, '0')}</span>
            <span className="label">Seconds</span>
          </div>
        </div>
    
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/FalconX.css';
import falconIcon from '../assets/FalconXiCON.webp';

interface CountdownState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const COUNTDOWN_KEY = 'countdown_state';

const FalconX: React.FC = () => {
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
    const handleScroll = () => {
      const elements = document.querySelectorAll('.fade-in-section');
      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top <= window.innerHeight * 0.75;
        if (isVisible) {
          element.classList.add('is-visible');
        }
      });
    };

    const timer = setInterval(() => {
      setCountdown((prev: CountdownState) => {
        if (prev.days === 0 && prev.hours === 0 && prev.minutes === 0 && prev.seconds === 0) {
          return prev;
        }

        let newSeconds = prev.seconds - 1;
        let newMinutes = prev.minutes;
        let newHours = prev.hours;
        let newDays = prev.days;

        if (newSeconds < 0) {
          newSeconds = 59;
          newMinutes -= 1;
        }
        if (newMinutes < 0) {
          newMinutes = 59;
          newHours -= 1;
        }
        if (newHours < 0) {
          newHours = 23;
          newDays -= 1;
        }
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
        localStorage.setItem(COUNTDOWN_KEY, JSON.stringify(newState));
        return newState;
      });
    }, 1000);

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="falconx-container">
      <div className="animated-background">
        {/* Background circles are now handled by connected-circles */}
        <div className="holographic-falcons">
          <div className="holo-falcon"></div>
          <div className="holo-falcon"></div>
          <div className="holo-falcon"></div>
          <div className="holo-falcon"></div>
          <div className="holo-falcon"></div>
          <div className="holo-falcon"></div>
          <div className="holo-falcon"></div>
          <div className="holo-falcon"></div>
          <div className="holo-falcon"></div>
          <div className="holo-falcon"></div>
          <div className="holo-connections"></div>
        </div>
        <div className="digital-grid"></div>
      </div>
      
      {/* Header */}
      <header className="site-header">
        <div className="header-content">
          <div className="logo">
            <img src={falconIcon} alt="FalconX Logo" className="logo-image" />
            FalconX
          </div>
          <nav className="main-nav">
            <Link to="/technology">Technology</Link>
            <Link to="/ai-agents">AI Agents</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section fade-in-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="neon-text">FalconX</h1>
            <p className="hero-subtitle">
              AI-Powered AI Agent with Native Token Economy
            </p>
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
            <p className="hero-description">
              Revolutionary trading ecosystem powered by blockchain technology. Our FLX token enables software licensing and decentralized network governance. Coming soon: Advanced AI agents that will transform autonomous trading operations.
            </p>
            <div className="market-highlights">
              <div className="highlight-item">
                <span className="highlight-value">99%</span>
                <span className="highlight-label">AI Accuracy Rate</span>
              </div>
              <div className="highlight-item">
                <span className="highlight-value">500+</span>
                <span className="highlight-label">Active Drones</span>
              </div>
            </div>
          </div>
          <div className="hero-image-container glass-effect">
            <img src={falconIcon} alt="FalconX" className="hero-image" />
          </div>
        </div>
        <div className="connected-circles">
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="lines"></div>
        </div>
      </section>

      {/* Token Utility Section */}
      <section className="info-section fade-in-section">
        <h2 className="section-title neon-text">FLX Token Ecosystem</h2>
        <div className="info-content">
          <div className="market-stats">
            <div className="stat-card">
              <h3>AI Agent Power</h3>
              <p className="stat-value">Real-time</p>
              <p className="stat-desc">AI processing & decision making</p>
            </div>
            <div className="stat-card">
              <h3>Software Access</h3>
              <p className="stat-value">Pay-per-use</p>
              <p className="stat-desc">Dynamic software licensing</p>
            </div>
            <div className="stat-card">
              <h3>Network Governance</h3>
              <p className="stat-value">DAO</p>
              <p className="stat-desc">Community-driven development</p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Integration Section */}
      <section className="info-section fade-in-section">
        <h2 className="section-title neon-text">AI & Blockchain Integration</h2>
        <div className="info-content">
          <p>Our platform combines advanced drone AI agents with Solana blockchain technology. FLX tokens power the AI agents, enabling autonomous decision-making, secure data transmission, and decentralized operations.</p>
          <p className="mt-4">Built on Solana's high-performance blockchain, our system processes thousands of AI operations per second with minimal latency and transaction costs.</p>
          <div className="stats-container">
            <div className="stat-item">
              <span className="stat-number">0.1s</span>
              <span className="stat-label">AI Response Time</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">65,000</span>
              <span className="stat-label">TPS on Solana</span>
            </div>
          </div>
        </div>
      </section>

      {/* AI Capabilities Section */}
      <section className="features-section fade-in-section">
        <h2 className="section-title neon-text">AI Agent Capabilities</h2>
        <div className="coming-soon-banner">
          <span className="coming-soon-label">Coming Soon</span>
          <p className="coming-soon-desc">Our groundbreaking AI agents are in final development stages. These agents will revolutionize the drone industry by enabling:</p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <span className="feature-icon">🧠</span>
            <h3>Advanced Decision Making</h3>
            <p>Next-gen AI algorithms for autonomous navigation and obstacle avoidance</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">👁️</span>
            <h3>Computer Vision</h3>
            <p>Real-time object detection and environmental analysis</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🎯</span>
            <h3>Mission Planning</h3>
            <p>Intelligent route optimization and dynamic mission adjustment</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🤝</span>
            <h3>Swarm Intelligence</h3>
            <p>Coordinated multi-drone operations for complex tasks</p>
          </div>
        </div>
      </section>

      {/* Token Use Cases Section */}
      <section className="token-section fade-in-section">
        <h2 className="section-title neon-text">FLX Token Use Cases</h2>
        <p className="section-subtitle">Powering the future of autonomous trading operations</p>
        <div className="token-features">
          <div className="token-feature">
            <span className="neon-icon">🤖</span>
            <p>AI Agent Activation and Training</p>
          </div>
          <div className="token-feature">
            <span className="neon-icon">💳</span>
            <p>Pay-per-use Software Licensing</p>
          </div>
          <div className="token-feature">
            <span className="neon-icon">🔄</span>
            <p>Automated Service Payments</p>
          </div>
          <div className="token-feature">
            <span className="neon-icon">🏛️</span>
            <p>DAO Governance Voting</p>
          </div>
          <div className="token-feature">
            <span className="neon-icon">📊</span>
            <p>Network Resource Allocation</p>
          </div>
        </div>
      </section>

      {/* Token Economics Section */}
      <section className="info-section fade-in-section">
        <h2 className="section-title neon-text">Token Economics</h2>
        <div className="info-content">
          <div className="tokenomics-grid">
            <div clas
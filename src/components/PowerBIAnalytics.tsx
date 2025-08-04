'use client'

import React, { useState, useEffect, useRef } from 'react';
import { BarChart3, TrendingUp, Calendar, Filter, MapPin, Trophy, Users, Clock, Activity, ChevronDown, Globe, Zap, Target, Award } from 'lucide-react';

const PowerBIAnalytics = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [timeRange, setTimeRange] = useState('year');
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedClub, setSelectedClub] = useState(null);
  const [animateCharts, setAnimateCharts] = useState(false);
  const containerRef = useRef(null);

  // Location data with multiple clubs per city
  const locationData = {
    "Lisbon": {
      lat: 38.7223,
      lng: -9.1393,
      clubs: [
        {
          name: "Padel Club Lisboa",
          matches: 87,
          winRate: 62,
          avgDuration: 72,
          topPartners: ["João", "Maria"],
          bestTime: "Evening"
        },
        {
          name: "Lisbon Sports Center",
          matches: 45,
          winRate: 58,
          avgDuration: 68,
          topPartners: ["Carlos", "Ana"],
          bestTime: "Morning"
        }
      ]
    },
    "Porto": {
      lat: 41.1579,
      lng: -8.6291,
      clubs: [
        {
          name: "Porto Padel Center",
          matches: 34,
          winRate: 71,
          avgDuration: 75,
          topPartners: ["Pedro", "Rita"],
          bestTime: "Afternoon"
        }
      ]
    },
    "Faro": {
      lat: 37.0194,
      lng: -7.9322,
      clubs: [
        {
          name: "Algarve Sports Complex",
          matches: 23,
          winRate: 65,
          avgDuration: 80,
          topPartners: ["Miguel", "Sofia"],
          bestTime: "Morning"
        }
      ]
    },
    "Coimbra": {
      lat: 40.2033,
      lng: -8.4103,
      clubs: [
        {
          name: "Coimbra Padel Academy",
          matches: 45,
          winRate: 69,
          avgDuration: 70,
          topPartners: ["Tiago", "Beatriz"],
          bestTime: "Evening"
        }
      ]
    },
    "Cascais": {
      lat: 38.6968,
      lng: -9.4215,
      clubs: [
        {
          name: "Cascais Beach Padel",
          matches: 19,
          winRate: 63,
          avgDuration: 65,
          topPartners: ["André", "Catarina"],
          bestTime: "Sunset"
        }
      ]
    }
  };

  // Generate time series data
  const generateTimeSeriesData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const data = [];
    
    months.forEach((month, index) => {
      const baseMatches = 15 + Math.random() * 10;
      const baseWinRate = 55 + Math.random() * 20;
      
      data.push({
        month,
        matches: Math.round(baseMatches),
        winRate: Math.round(baseWinRate),
        avgDuration: 65 + Math.round(Math.random() * 15),
        improvement: index > 0 ? Math.round((baseWinRate - 60) * 100) / 100 : 0
      });
    });
    
    return data;
  };

  const [monthlyData] = useState(generateTimeSeriesData());

  // Calculate aggregated stats
  const calculateStats = () => {
    if (selectedLocation && selectedClub) {
      const club = locationData[selectedLocation].clubs.find(c => c.name === selectedClub);
      return {
        totalMatches: club.matches,
        winRate: club.winRate,
        avgDuration: club.avgDuration,
        bestPartner: club.topPartners[0],
        preferredTime: club.bestTime
      };
    }
    
    // Overall stats
    let totalMatches = 0;
    let totalWins = 0;
    let totalDuration = 0;
    
    Object.values(locationData).forEach(city => {
      city.clubs.forEach(club => {
        totalMatches += club.matches;
        totalWins += Math.round(club.matches * club.winRate / 100);
        totalDuration += club.avgDuration * club.matches;
      });
    });
    
    return {
      totalMatches,
      winRate: Math.round(totalWins / totalMatches * 100),
      avgDuration: Math.round(totalDuration / totalMatches),
      bestPartner: "João",
      preferredTime: "Evening"
    };
  };

  const stats = calculateStats();

  useEffect(() => {
    if (activeSection === 'dashboard') {
      setAnimateCharts(true);
    }
  }, [activeSection]);

  const containerStyle = {
    minHeight: '100vh',
    background: '#F2F2F2',
    fontFamily: '"Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, sans-serif'
  };

  const headerStyle = {
    background: '#2B2B2B',
    padding: '20px 40px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  };

  const navStyle = {
    display: 'flex',
    gap: '24px',
    alignItems: 'center'
  };

  const navButtonStyle = (isActive) => ({
    padding: '10px 24px',
    background: isActive ? '#FF6B35' : 'transparent',
    color: isActive ? 'white' : '#CCCCCC',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  });

  const dashboardContainerStyle = {
    display: activeSection === 'dashboard' ? 'block' : 'none',
    padding: '32px',
    maxWidth: '1600px',
    margin: '0 auto'
  };

  const filtersBarStyle = {
    background: 'white',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
  };

  const timeButtonStyle = (isActive) => ({
    padding: '8px 16px',
    background: isActive ? '#FF6B35' : '#F5F5F5',
    color: isActive ? 'white' : '#666',
    border: 'none',
    borderRadius: '4px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  });

  const statsGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    marginBottom: '32px'
  };

  const statCardStyle = (color = '#FF6B35') => ({
    background: 'white',
    padding: '24px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    borderLeft: `4px solid ${color}`,
    transition: 'all 0.3s ease'
  });

  const chartGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
    gap: '24px'
  };

  const chartCardStyle = {
    background: 'white',
    padding: '24px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    height: '400px'
  };

  const globeContainerStyle = {
    display: activeSection === 'globe' ? 'block' : 'none',
    padding: '32px',
    background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
    minHeight: 'calc(100vh - 80px)'
  };

  const globeWrapperStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 400px',
    gap: '32px',
    maxWidth: '1400px',
    margin: '0 auto'
  };

  const globeStyle = {
    width: '100%',
    height: '700px',
    background: 'rgba(255, 255, 255, 0.02)',
    borderRadius: '16px',
    position: 'relative',
    overflow: 'visible',
    display: 'flex',
    flexDirection: 'column'
  };

  const mapContainerStyle = {
    flex: 1,
    position: 'relative',
    margin: '40px',
    background: `
      radial-gradient(ellipse at center, rgba(255, 107, 53, 0.05) 0%, transparent 70%),
      radial-gradient(ellipse at top right, rgba(59, 130, 246, 0.05) 0%, transparent 50%)
    `,
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.1)'
  };

  const locationDetailsStyle = {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    padding: '32px',
    color: 'white'
  };

  // Convert lat/lng to 3D sphere coordinates
  const latLngToVector3 = (lat: number, lng: number, radius = 250) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);
    
    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);
    
    return { x, y, z };
  };

  // Create bar chart bars
  const BarChart = ({ data, height = 300 }) => {
    const maxValue = Math.max(...data.map(d => d.matches));
    
    return (
      <div style={{ height, display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
        {data.map((item, index) => (
          <div key={index} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div
              style={{
                width: '100%',
                background: 'linear-gradient(180deg, #FF6B35 0%, #FF4A1C 100%)',
                borderRadius: '4px 4px 0 0',
                height: animateCharts ? `${(item.matches / maxValue) * 200}px` : '0px',
                transition: `height 0.8s ease ${index * 0.1}s`,
                position: 'relative'
              }}
            >
              <div style={{
                position: 'absolute',
                top: '-25px',
                left: '50%',
                transform: 'translateX(-50%)',
                fontSize: '12px',
                fontWeight: '600',
                color: '#666'
              }}>
                {item.matches}
              </div>
            </div>
            <div style={{
              marginTop: '8px',
              fontSize: '12px',
              color: '#666'
            }}>
              {item.month.slice(0, 3)}
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Create line chart
  const LineChart = ({ data, height = 300 }) => {
    const maxValue = Math.max(...data.map(d => d.winRate));
    const minValue = Math.min(...data.map(d => d.winRate));
    
    return (
      <div style={{ height, position: 'relative' }}>
        <svg width="100%" height="100%" style={{ overflow: 'visible' }}>
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FF6B35" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FF6B35" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map(value => (
            <line
              key={value}
              x1="0"
              y1={height - (value / 100) * height}
              x2="100%"
              y2={height - (value / 100) * height}
              stroke="#E5E5E5"
              strokeDasharray="5,5"
            />
          ))}
          
          {/* Area */}
          <path
            d={`
              M 0 ${height}
              ${data.map((item, index) => {
                const x = (index / (data.length - 1)) * 100;
                const y = height - ((item.winRate - minValue) / (maxValue - minValue)) * height * 0.8 - 20;
                return `L ${x}% ${y}`;
              }).join(' ')}
              L 100% ${height}
              Z
            `}
            fill="url(#lineGradient)"
            opacity={animateCharts ? 1 : 0}
            style={{ transition: 'opacity 1s ease' }}
          />
          
          {/* Line */}
          <path
            d={`
              M 0 ${height - ((data[0].winRate - minValue) / (maxValue - minValue)) * height * 0.8 - 20}
              ${data.slice(1).map((item, index) => {
                const x = ((index + 1) / (data.length - 1)) * 100;
                const y = height - ((item.winRate - minValue) / (maxValue - minValue)) * height * 0.8 - 20;
                return `L ${x}% ${y}`;
              }).join(' ')}
            `}
            fill="none"
            stroke="#FF6B35"
            strokeWidth="3"
            strokeDasharray={animateCharts ? "0" : "1000"}
            strokeDashoffset={animateCharts ? "0" : "1000"}
            style={{ transition: 'stroke-dashoffset 2s ease' }}
          />
          
          {/* Points */}
          {data.map((item, index) => {
            const x = (index / (data.length - 1)) * 100;
            const y = height - ((item.winRate - minValue) / (maxValue - minValue)) * height * 0.8 - 20;
            
            return (
              <g key={index}>
                <circle
                  cx={`${x}%`}
                  cy={y}
                  r="6"
                  fill="white"
                  stroke="#FF6B35"
                  strokeWidth="3"
                  opacity={animateCharts ? 1 : 0}
                  style={{ transition: `opacity 0.5s ease ${index * 0.1 + 1}s` }}
                />
                <text
                  x={`${x}%`}
                  y={y - 15}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="600"
                  fill="#666"
                >
                  {item.winRate}%
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    );
  };

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <div style={navStyle}>
          
          <button
            style={navButtonStyle(activeSection === 'dashboard')}
            onClick={() => setActiveSection('dashboard')}
          >
            <Activity size={20} />
            Performance Dashboard
          </button>
          <button
            style={navButtonStyle(activeSection === 'globe')}
            onClick={() => setActiveSection('globe')}
          >
            <Globe size={20} />
            Location Analytics
          </button>
        </div>
      </div>

      {/* Section 1: Dashboard */}
      <div style={dashboardContainerStyle}>
        {/* Filters Bar */}
        <div style={filtersBarStyle}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <Calendar size={20} color="#666" />
            <button
              style={timeButtonStyle(timeRange === 'week')}
              onClick={() => setTimeRange('week')}
            >
              Week
            </button>
            <button
              style={timeButtonStyle(timeRange === 'month')}
              onClick={() => setTimeRange('month')}
            >
              Month
            </button>
            <button
              style={timeButtonStyle(timeRange === 'year')}
              onClick={() => setTimeRange('year')}
            >
              Year
            </button>
            <button
              style={timeButtonStyle(timeRange === 'all')}
              onClick={() => setTimeRange('all')}
            >
              All Time
            </button>
          </div>
          
          <div style={{ display: 'flex', gap: '12px' }}>
            <button style={{
              padding: '8px 16px',
              background: '#F5F5F5',
              border: 'none',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer'
            }}>
              <Filter size={16} />
              More Filters
              <ChevronDown size={16} />
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div style={statsGridStyle}>
          <div style={statCardStyle('#FF6B35')}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
              <div>
                <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>Total Matches</div>
                <div style={{ fontSize: '32px', fontWeight: '700', color: '#2C2C2C' }}>{stats.totalMatches}</div>
                <div style={{ fontSize: '12px', color: '#22C55E', marginTop: '4px' }}>
                  <TrendingUp size={14} style={{ display: 'inline' }} /> +12% vs last period
                </div>
              </div>
              <Trophy size={32} color="#FF6B35" />
            </div>
          </div>
          
          <div style={statCardStyle('#22C55E')}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
              <div>
                <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>Win Rate</div>
                <div style={{ fontSize: '32px', fontWeight: '700', color: '#2C2C2C' }}>{stats.winRate}%</div>
                <div style={{ fontSize: '12px', color: '#22C55E', marginTop: '4px' }}>
                  <TrendingUp size={14} style={{ display: 'inline' }} /> +5% improvement
                </div>
              </div>
              <Target size={32} color="#22C55E" />
            </div>
          </div>
          
          <div style={statCardStyle('#3B82F6')}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
              <div>
                <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>Avg. Duration</div>
                <div style={{ fontSize: '32px', fontWeight: '700', color: '#2C2C2C' }}>{stats.avgDuration}m</div>
                <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>Per match</div>
              </div>
              <Clock size={32} color="#3B82F6" />
            </div>
          </div>
          
          <div style={statCardStyle('#8B5CF6')}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
              <div>
                <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>Best Partner</div>
                <div style={{ fontSize: '24px', fontWeight: '700', color: '#2C2C2C' }}>{stats.bestPartner}</div>
                <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>78% win rate together</div>
              </div>
              <Users size={32} color="#8B5CF6" />
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div style={chartGridStyle}>
          {/* Matches by Month */}
          <div style={chartCardStyle}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '24px', color: '#2C2C2C' }}>
              Matches by Month
            </h3>
            <BarChart data={monthlyData} />
          </div>
          
          {/* Win Rate Trend */}
          <div style={chartCardStyle}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '24px', color: '#2C2C2C' }}>
              Win Rate Trend
            </h3>
            <LineChart data={monthlyData} />
          </div>
          
          {/* Top Performing Clubs */}
          <div style={chartCardStyle}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '24px', color: '#2C2C2C' }}>
              Top Performing Clubs
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', padding: '12px' }}>
              {(() => {
                // Get all clubs and sort by win rate
                const allClubs = Object.entries(locationData).flatMap(([city, data]) =>
                  data.clubs.map(club => ({ ...club, city }))
                ).sort((a, b) => b.winRate - a.winRate).slice(0, 4);
                
                return allClubs.map((club, index) => (
                  <div
                    key={index}
                    style={{
                      textAlign: 'center',
                      padding: '8px',
                      background: '#F9FAFB',
                      borderRadius: '4px',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      border: '1px solid transparent'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-1px)';
                      e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.1)';
                      e.currentTarget.style.borderColor = '#FF6B35';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.borderColor = 'transparent';
                    }}
                  >
                    <div style={{ fontSize: '12px', fontWeight: '600', marginBottom: '4px', color: '#2C2C2C' }}>
                      {club.name}
                    </div>
                    <div style={{ fontSize: '10px', color: '#666', marginBottom: '6px' }}>
                      {club.city}
                    </div>
                    <div style={{ fontSize: '16px', fontWeight: '700', color: '#FF6B35', marginBottom: '2px' }}>
                      {club.winRate}%
                    </div>
                    <div style={{ fontSize: '10px', color: '#666' }}>
                      {club.matches} matches
                    </div>
                  </div>
                ));
              })()}
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Globe */}
      <div style={globeContainerStyle}>
        <div style={globeWrapperStyle}>
          {/* Map Container */}
          <div style={globeStyle}>
            <div style={{ padding: '24px', color: 'white' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '8px' }}>
                Location Performance Analytics
              </h2>
              <p style={{ opacity: 0.8 }}>
                Click on a city to explore club-specific statistics
              </p>
            </div>
            
            <div style={mapContainerStyle}>
              {/* Background grid */}
              <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                <defs>
                  <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                    <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
              
              {/* Connection lines */}
              <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
                {selectedLocation && Object.entries(locationData).map(([city, data]) => {
                  if (city === selectedLocation) return null;
                  
                  const fromX = ((locationData[selectedLocation].lng + 10) / 2) * 100;
                  const fromY = (1 - (locationData[selectedLocation].lat - 36.5) / 5.5) * 100;
                  const toX = ((data.lng + 10) / 2) * 100;
                  const toY = (1 - (data.lat - 36.5) / 5.5) * 100;
                  
                  return (
                    <line
                      key={city}
                      x1={`${fromX}%`}
                      y1={`${fromY}%`}
                      x2={`${toX}%`}
                      y2={`${toY}%`}
                      stroke="#FF6B35"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                      opacity="0.3"
                    />
                  );
                })}
              </svg>
              
              {/* Location markers */}
              {Object.entries(locationData).map(([city, data]) => {
                const x = ((data.lng + 10) / 2) * 100; // Normalize longitude
                const y = (1 - (data.lat - 36.5) / 5.5) * 100; // Normalize latitude
                const isSelected = selectedLocation === city;
                
                return (
                  <div
                    key={city}
                    style={{
                      position: 'absolute',
                      left: `${x}%`,
                      top: `${y}%`,
                      transform: 'translate(-50%, -50%)',
                      cursor: 'pointer',
                      zIndex: isSelected ? 10 : 5
                    }}
                    onClick={() => {
                      setSelectedLocation(city);
                      setSelectedClub(data.clubs[0].name);
                    }}
                  >
                    {/* Ripple effect for selected */}
                    {isSelected && (
                      <>
                        <div style={{
                          position: 'absolute',
                          width: '80px',
                          height: '80px',
                          background: 'radial-gradient(circle, rgba(255, 107, 53, 0.4) 0%, transparent 70%)',
                          borderRadius: '50%',
                          animation: 'pulse 2s ease-out infinite',
                          transform: 'translate(-50%, -50%)',
                          left: '50%',
                          top: '50%'
                        }} />
                        <div style={{
                          position: 'absolute',
                          width: '120px',
                          height: '120px',
                          background: 'radial-gradient(circle, rgba(255, 107, 53, 0.2) 0%, transparent 70%)',
                          borderRadius: '50%',
                          animation: 'pulse 2s ease-out infinite 0.5s',
                          transform: 'translate(-50%, -50%)',
                          left: '50%',
                          top: '50%'
                        }} />
                      </>
                    )}
                    
                    {/* Pin container */}
                    <div
                      style={{
                        position: 'relative',
                        transition: 'all 0.3s ease',
                        transform: isSelected ? 'scale(1.3)' : 'scale(1)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.2)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = isSelected ? 'scale(1.3)' : 'scale(1)';
                      }}
                    >
                      {/* Pin */}
                      <div style={{
                        width: '40px',
                        height: '40px',
                        background: isSelected 
                          ? 'linear-gradient(135deg, #FF6B35 0%, #FF4A1C 100%)'
                          : 'linear-gradient(135deg, #FF8C61 0%, #FF6B35 100%)',
                        borderRadius: '50% 50% 50% 0',
                        transform: 'rotate(-45deg)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: isSelected 
                          ? '0 0 20px rgba(255, 107, 53, 0.8)'
                          : '0 4px 12px rgba(0, 0, 0, 0.3)',
                        position: 'relative'
                      }}>
                        <MapPin size={20} color="white" style={{ transform: 'rotate(45deg)' }} />
                      </div>
                      
                      {/* City name */}
                      <div style={{
                        position: 'absolute',
                        top: '100%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        marginTop: '8px',
                        color: 'white',
                        fontSize: '14px',
                        fontWeight: '600',
                        textShadow: '0 2px 8px rgba(0,0,0,0.8)',
                        whiteSpace: 'nowrap',
                        background: 'rgba(0,0,0,0.5)',
                        padding: '4px 12px',
                        borderRadius: '4px'
                      }}>
                        {city}
                      </div>
                      
                      {/* Club count */}
                      <div style={{
                        position: 'absolute',
                        top: '-8px',
                        right: '-8px',
                        background: '#FF6B35',
                        color: 'white',
                        borderRadius: '50%',
                        width: '24px',
                        height: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                        fontWeight: '700',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                        border: '2px solid white'
                      }}>
                        {data.clubs.length}
                      </div>
                      
                      {/* Stats preview */}
                      {isSelected && (
                        <div style={{
                          position: 'absolute',
                          bottom: '100%',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          marginBottom: '16px',
                          background: 'rgba(0, 0, 0, 0.9)',
                          padding: '12px 16px',
                          borderRadius: '8px',
                          whiteSpace: 'nowrap',
                          fontSize: '12px',
                          color: 'white',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
                        }}>
                          <div style={{ display: 'flex', gap: '16px' }}>
                            <div>
                              <strong>{data.clubs.reduce((sum, club) => sum + club.matches, 0)}</strong> matches
                            </div>
                            <div>
                              <strong>{Math.round(data.clubs.reduce((sum, club) => sum + club.winRate, 0) / data.clubs.length)}%</strong> avg win
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Location Details Panel */}
          <div style={locationDetailsStyle}>
            <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '24px' }}>
              {selectedLocation ? `${selectedLocation} Analytics` : 'Select a Location'}
            </h3>
            
            {selectedLocation ? (
              <>
                {/* Club selector */}
                <div style={{ marginBottom: '24px' }}>
                  <label style={{ fontSize: '14px', opacity: 0.8, display: 'block', marginBottom: '8px' }}>
                    Select Club
                  </label>
                  <select
                    value={selectedClub}
                    onChange={(e) => setSelectedClub(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '8px',
                      color: 'white',
                      fontSize: '16px',
                      cursor: 'pointer'
                    }}
                  >
                    {locationData[selectedLocation].clubs.map(club => (
                      <option key={club.name} value={club.name} style={{ background: '#2B2B2B' }}>
                        {club.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* Club stats */}
                {selectedClub && (() => {
                  const club = locationData[selectedLocation].clubs.find(c => c.name === selectedClub);
                  return (
                    <>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                        <div style={{
                          background: 'rgba(255, 255, 255, 0.1)',
                          padding: '20px',
                          borderRadius: '12px',
                          textAlign: 'center'
                        }}>
                          <Trophy size={24} style={{ marginBottom: '8px' }} />
                          <div style={{ fontSize: '28px', fontWeight: '700' }}>{club.matches}</div>
                          <div style={{ fontSize: '14px', opacity: 0.8 }}>Matches Played</div>
                        </div>
                        
                        <div style={{
                          background: 'rgba(255, 255, 255, 0.1)',
                          padding: '20px',
                          borderRadius: '12px',
                          textAlign: 'center'
                        }}>
                          <Target size={24} style={{ marginBottom: '8px' }} />
                          <div style={{ fontSize: '28px', fontWeight: '700' }}>{club.winRate}%</div>
                          <div style={{ fontSize: '14px', opacity: 0.8 }}>Win Rate</div>
                        </div>
                      </div>
                      
                      <div style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        padding: '20px',
                        borderRadius: '12px',
                        marginBottom: '16px'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                          <Clock size={20} />
                          <span>Average Duration: {club.avgDuration} minutes</span>
                        </div>
                        
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                          <Users size={20} />
                          <span>Top Partners: {club.topPartners.join(', ')}</span>
                        </div>
                        
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <Zap size={20} />
                          <span>Best Performance: {club.bestTime}</span>
                        </div>
                      </div>
                      
                      {/* Win rate progress */}
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                          <span>Win Rate vs Average</span>
                          <span>{club.winRate > 65 ? '+' : ''}{club.winRate - 65}%</span>
                        </div>
                        <div style={{ height: '8px', background: 'rgba(255, 255, 255, 0.2)', borderRadius: '4px', overflow: 'hidden' }}>
                          <div
                            style={{
                              height: '100%',
                              width: `${club.winRate}%`,
                              background: club.winRate > 65 
                                ? 'linear-gradient(90deg, #22C55E 0%, #10B981 100%)'
                                : 'linear-gradient(90deg, #F59E0B 0%, #EF4444 100%)',
                              transition: 'width 1s ease'
                            }}
                          />
                        </div>
                      </div>
                    </>
                  );
                })()}
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px', opacity: 0.6 }}>
                <Globe size={48} style={{ marginBottom: '16px', opacity: 0.5 }} />
                <p>Click on any city marker to view detailed analytics for clubs in that location</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.8;
          }
          100% {
            transform: translate(-50%, -50%) scale(1.5);
            opacity: 0;
          }
        }
        
        @keyframes pulseRing {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default PowerBIAnalytics; 
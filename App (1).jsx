import React, { useState, useEffect } from 'react';

// Player data with Ultimate Elo
const initialPlayers = {
  SHAW: { elo: 1685, peakElo: 1685 },
  AADI: { elo: 1592, peakElo: 1592 },
  BEN: { elo: 1575, peakElo: 1589 },
  NICK: { elo: 1493, peakElo: 1500 },
  SEAMUS: { elo: 1474, peakElo: 1500 },
  RYAN: { elo: 1474, peakElo: 1500 },
  YEAGER: { elo: 1471, peakElo: 1562 },
  HENRY: { elo: 1461, peakElo: 1538 },
  ASHER: { elo: 1414, peakElo: 1514 },
  ELI: { elo: 1414, peakElo: 1525 },
};

const teamElos = {
  // SEC
  'Alabama': 1857, 'Arkansas': 1620, 'Auburn': 1680, 'Florida': 1700, 'Georgia': 2057,
  'Kentucky': 1580, 'LSU': 1690, 'Mississippi State': 1550, 'Missouri': 1640, 'Oklahoma': 1720,
  'Ole Miss': 2009, 'South Carolina': 1560, 'Tennessee': 1780, 'Texas': 1920, 'Texas A&M': 1650, 'Vanderbilt': 1400,
  
  // Big Ten
  'Illinois': 1520, 'Indiana': 2354, 'Iowa': 1937, 'Maryland': 1480, 'Michigan': 1786,
  'Michigan State': 1540, 'Minnesota': 1560, 'Nebraska': 1580, 'Northwestern': 1450, 'Ohio State': 2138,
  'Oregon': 2071, 'Penn State': 1954, 'Purdue': 1420, 'Rutgers': 1440, 'UCLA': 1550,
  'USC': 1750, 'Washington': 1680, 'Wisconsin': 1620,
  
  // Big 12
  'Arizona': 1350, 'Arizona State': 1340, 'Baylor': 1560, 'BYU': 1620, 'UCF': 1580,
  'Cincinnati': 1540, 'Colorado': 1600, 'Houston': 1480, 'Iowa State': 1640, 'Kansas': 1520,
  'Kansas State': 1660, 'Oklahoma State': 1580, 'TCU': 1600, 'Texas Tech': 2056, 'Utah': 1976, 'West Virginia': 1500,
  
  // ACC
  'Boston College': 1420, 'California': 1480, 'Clemson': 1680, 'Duke': 1560, 'Florida State': 1550,
  'Georgia Tech': 1380, 'Louisville': 1600, 'Miami': 2006, 'NC State': 1540, 'North Carolina': 1580,
  'Pittsburgh': 1560, 'SMU': 1620, 'Stanford': 1450, 'Syracuse': 1520, 'Virginia': 1460,
  'Virginia Tech': 1500, 'Wake Forest': 1480,
  
  // Group of 5 - AAC
  'Army': 1589, 'Charlotte': 1320, 'East Carolina': 1400, 'FAU': 1380, 'Memphis': 1560,
  'Navy': 1575, 'North Texas': 1440, 'Rice': 1360, 'South Florida': 1380, 'Temple': 1340,
  'Tulane': 1580, 'Tulsa': 1380, 'UAB': 1460, 'UTSA': 1480,
  
  // Group of 5 - Conference USA
  'FIU': 1300, 'Jacksonville State': 1350, 'Kennesaw State': 1320, 'Liberty': 1540,
  'Louisiana Tech': 1420, 'Middle Tennessee': 1380, 'New Mexico State': 1320, 'Sam Houston': 1450,
  'UTEP': 1340, 'Western Kentucky': 1440,
  
  // Group of 5 - MAC
  'Akron': 1300, 'Ball State': 1360, 'Bowling Green': 1380, 'Buffalo': 1400, 'Central Michigan': 1380,
  'Eastern Michigan': 1360, 'Kent State': 1280, 'Miami (OH)': 1480, 'Northern Illinois': 1460,
  'Ohio': 1420, 'Toledo': 1520, 'Western Michigan': 1440,
  
  // Group of 5 - Mountain West
  'Air Force': 1520, 'Boise State': 1680, 'Colorado State': 1420, 'Fresno State': 1520,
  'Hawaii': 1340, 'Nevada': 1380, 'New Mexico': 1320, 'San Diego State': 1500, 'San Jose State': 1460,
  'UNLV': 1580, 'Utah State': 1420, 'Wyoming': 1400,
  
  // Group of 5 - Sun Belt
  'Appalachian State': 1540, 'Arkansas State': 1380, 'Coastal Carolina': 1460, 'Georgia Southern': 1420,
  'Georgia State': 1380, 'James Madison': 1580, 'Louisiana': 1480, 'Marshall': 1460, 'Old Dominion': 1360,
  'South Alabama': 1420, 'Southern Miss': 1400, 'Texas State': 1440, 'Troy': 1460, 'UL Monroe': 1320,
  
  // Independents
  'Notre Dame': 1850, 'UConn': 1380, 'UMass': 1300,
};

const initialGames = [
  { id: 1, home: 'ASHER', away: 'ELI', teamH: 'Navy', teamA: 'Army', scoreH: 23, scoreA: 21, session: 1 },
  { id: 2, home: 'ELI', away: 'ASHER', teamH: 'Ole Miss', teamA: 'Texas Tech', scoreH: 34, scoreA: 7, session: 1 },
  { id: 3, home: 'ELI', away: 'BEN', teamH: 'Vanderbilt', teamA: 'USC', scoreH: 21, scoreA: 41, session: 1 },
  { id: 4, home: 'ASHER', away: 'BEN', teamH: 'Texas Tech', teamA: 'Georgia', scoreH: 14, scoreA: 31, session: 1 },
  { id: 5, home: 'BEN', away: 'HENRY', teamH: 'Notre Dame', teamA: 'BYU', scoreH: 17, scoreA: 31, session: 1 },
  { id: 6, home: 'ELI', away: 'HENRY', teamH: 'Tennessee', teamA: 'Georgia Tech', scoreH: 28, scoreA: 7, session: 1 },
  { id: 7, home: 'YEAGER', away: 'AADI', teamH: 'Texas', teamA: 'Vanderbilt', scoreH: 39, scoreA: 42, session: 1 },
  { id: 8, home: 'HENRY', away: 'YEAGER', teamH: 'Georgia', teamA: 'Ohio State', scoreH: 14, scoreA: 37, session: 2 },
  { id: 9, home: 'YEAGER', away: 'BEN', teamH: 'Ole Miss', teamA: 'Indiana', scoreH: 6, scoreA: 35, session: 2 },
  { id: 10, home: 'BEN', away: 'NICK', teamH: 'Michigan', teamA: 'Arizona', scoreH: 17, scoreA: 16, session: 2 },
  { id: 11, home: 'ELI', away: 'AADI', teamH: 'Notre Dame', teamA: 'Oklahoma', scoreH: 21, scoreA: 23, session: 2 },
  { id: 12, home: 'YEAGER', away: 'AADI', teamH: 'Miami', teamA: 'Texas A&M', scoreH: 35, scoreA: 21, session: 2 },
  { id: 13, home: 'SHAW', away: 'BEN', teamH: 'Tennessee', teamA: 'USC', scoreH: 30, scoreA: 20, session: 2 },
  { id: 14, home: 'YEAGER', away: 'AADI', teamH: 'Alabama', teamA: 'Vanderbilt', scoreH: 28, scoreA: 42, session: 2 },
  { id: 15, home: 'AADI', away: 'YEAGER', teamH: 'Texas', teamA: 'Oklahoma', scoreH: 30, scoreA: 14, session: 2 },
  { id: 16, home: 'AADI', away: 'SEAMUS', teamH: 'Texas', teamA: 'Indiana', scoreH: 34, scoreA: 7, session: 2 },
  { id: 17, home: 'BEN', away: 'ELI', teamH: 'Ole Miss', teamA: 'Oklahoma', scoreH: 36, scoreA: 34, session: 2 },
  { id: 18, home: 'YEAGER', away: 'ELI', teamH: 'Alabama', teamA: 'Vanderbilt', scoreH: 29, scoreA: 7, session: 3 },
  { id: 19, home: 'ELI', away: 'YEAGER', teamH: 'Texas', teamA: 'Michigan', scoreH: 17, scoreA: 28, session: 3 },
  { id: 20, home: 'BEN', away: 'YEAGER', teamH: 'Oklahoma', teamA: 'BYU', scoreH: 17, scoreA: 21, session: 3 },
  { id: 21, home: 'ELI', away: 'YEAGER', teamH: 'Tennessee', teamA: 'Texas', scoreH: 14, scoreA: 17, session: 3 },
  { id: 22, home: 'AADI', away: 'SHAW', teamH: 'Texas', teamA: 'Texas A&M', scoreH: 24, scoreA: 35, session: 3 },
  { id: 23, home: 'SHAW', away: 'YEAGER', teamH: 'Texas', teamA: 'Vanderbilt', scoreH: 20, scoreA: 0, session: 3 },
  { id: 24, home: 'SHAW', away: 'YEAGER', teamH: 'Miami', teamA: 'BYU', scoreH: 25, scoreA: 0, session: 3 },
  { id: 25, home: 'SHAW', away: 'YEAGER', teamH: 'Michigan', teamA: 'Alabama', scoreH: 38, scoreA: 13, session: 3 },
  { id: 26, home: 'ASHER', away: 'ELI', teamH: 'LSU', teamA: 'Alabama', scoreH: 41, scoreA: 43, session: 4 },
  { id: 27, home: 'ELI', away: 'BEN', teamH: 'USC', teamA: 'Arizona', scoreH: 14, scoreA: 34, session: 4 },
  { id: 28, home: 'BEN', away: 'ELI', teamH: 'Georgia', teamA: 'Ohio State', scoreH: 23, scoreA: 7, session: 4 },
  { id: 29, home: 'BEN', away: 'YEAGER', teamH: 'Texas Tech', teamA: 'Texas', scoreH: 14, scoreA: 7, session: 4 },
  { id: 30, home: 'YEAGER', away: 'BEN', teamH: 'Texas A&M', teamA: 'Oklahoma', scoreH: 28, scoreA: 21, session: 4 },
  { id: 31, home: 'RYAN', away: 'AADI', teamH: 'Notre Dame', teamA: 'Arizona', scoreH: 7, scoreA: 35, session: 4 },
  { id: 32, home: 'ASHER', away: 'HENRY', teamH: 'USC', teamA: 'Ole Miss', scoreH: 7, scoreA: 28, session: 4 },
  { id: 33, home: 'ELI', away: 'AADI', teamH: 'Oregon', teamA: 'Ole Miss', scoreH: 41, scoreA: 43, session: 4 },
  { id: 34, home: 'YEAGER', away: 'BEN', teamH: 'Texas A&M', teamA: 'Oregon', scoreH: 14, scoreA: 7, session: 4 },
  { id: 35, home: 'AADI', away: 'SHAW', teamH: 'Georgia', teamA: 'Oregon', scoreH: 43, scoreA: 53, session: 4 },
  { id: 36, home: 'YEAGER', away: 'AADI', teamH: 'Miami', teamA: 'Tennessee', scoreH: 7, scoreA: 30, session: 4 },
  { id: 37, home: 'ELI', away: 'SHAW', teamH: 'Alabama', teamA: 'USC', scoreH: 27, scoreA: 42, session: 4 },
  { id: 38, home: 'ELI', away: 'YEAGER', teamH: 'Oklahoma', teamA: 'Miami', scoreH: 23, scoreA: 20, session: 4, date: null },
  { id: 39, home: 'ELI', away: 'BEN', teamH: 'USC', teamA: 'Texas A&M', scoreH: 7, scoreA: 28, session: 4, date: '2025-01-16' },
  { id: 40, home: 'HENRY', away: 'ELI', teamH: 'Georgia', teamA: 'Miami', scoreH: 0, scoreA: 21, session: 4, date: '2025-01-16' },
  { id: 41, home: 'YEAGER', away: 'ELI', teamH: 'USC', teamA: 'Texas', scoreH: 10, scoreA: 7, session: 4, date: '2025-01-16' },
  { id: 42, home: 'YEAGER', away: 'BEN', teamH: 'Texas Tech', teamA: 'Indiana', scoreH: 0, scoreA: 28, session: 5, date: '2025-01-16' },
];

// Helper functions
const getStreak = (name, games) => {
  const pg = games.filter(g => g.home === name || g.away === name);
  if (!pg.length) return { type: null, count: 0 };
  let streak = 0, type = null;
  for (let i = pg.length - 1; i >= 0; i--) {
    const won = (pg[i].home === name && pg[i].scoreH > pg[i].scoreA) || (pg[i].away === name && pg[i].scoreA > pg[i].scoreH);
    if (type === null) { type = won ? 'W' : 'L'; streak = 1; }
    else if ((won && type === 'W') || (!won && type === 'L')) streak++;
    else break;
  }
  return { type, count: streak };
};

const getH2H = (p1, p2, games) => {
  const h2h = games.filter(g => (g.home === p1 && g.away === p2) || (g.home === p2 && g.away === p1));
  let w1 = 0, w2 = 0;
  h2h.forEach(g => {
    if ((g.home === p1 && g.scoreH > g.scoreA) || (g.away === p1 && g.scoreA > g.scoreH)) w1++;
    else w2++;
  });
  return { games: h2h.length, w1, w2, details: h2h };
};

// Prediction engine
const getPrediction = (p1, p2, t1, t2, players) => {
  const p1Elo = players[p1]?.elo || 1500;
  const p2Elo = players[p2]?.elo || 1500;
  const t1Elo = teamElos[t1] || 1600;
  const t2Elo = teamElos[t2] || 1600;
  
  const rating1 = p1Elo * 0.7 + t1Elo * 0.3;
  const rating2 = p2Elo * 0.7 + t2Elo * 0.3;
  const diff = rating1 - rating2;
  
  let prob = 1 / (1 + Math.pow(10, -diff / 400));
  prob = Math.max(0.15, Math.min(0.85, prob));
  
  // Spread always ends in .5, favorite always gets negative
  const absDiff = Math.abs(diff);
  const spreadInt = Math.floor(absDiff / 25);
  const spreadValue = spreadInt + 0.5;
  // Favorite (higher prob) gets negative spread
  const fav = prob >= 0.5 ? p1 : p2;
  
  const calcML = (p) => {
    const favProb = Math.max(p, 1-p);
    if (favProb < 0.55) return { f: -115, d: 100 };
    if (favProb < 0.65) return { f: -150, d: 130 };
    if (favProb < 0.75) return { f: -220, d: 180 };
    return { f: -350, d: 280 };
  };
  const ml = calcML(prob);
  
  return {
    prob1: (prob * 100).toFixed(0),
    prob2: ((1-prob) * 100).toFixed(0),
    spread: -spreadValue, // Always negative for the favorite
    fav: fav,
    ml1: prob >= 0.5 ? ml.f : ml.d,
    ml2: prob >= 0.5 ? ml.d : ml.f,
  };
};

const RIVALS = [
  { p: ['SHAW', 'AADI'], name: 'Battle for Crown', emoji: '👑' },
  { p: ['ELI', 'YEAGER'], name: 'Basement Brawl', emoji: '🥊' },
  { p: ['BEN', 'YEAGER'], name: 'The Grind', emoji: '⚔️' },
];

export default function QuadCFB() {
  const [players, setPlayers] = useState(() => {
    try {
      const saved = localStorage.getItem('quadcfb-players-v2');
      return saved ? JSON.parse(saved) : initialPlayers;
    } catch { return initialPlayers; }
  });
  const [games, setGames] = useState(() => {
    try {
      const saved = localStorage.getItem('quadcfb-games-v2');
      return saved ? JSON.parse(saved) : initialGames;
    } catch { return initialGames; }
  });
  const [tab, setTab] = useState('leaderboard');
  const [dark, setDark] = useState(() => {
    try {
      const saved = localStorage.getItem('quadcfb-dark');
      return saved ? JSON.parse(saved) : false;
    } catch { return false; }
  });
  const [selGame, setSelGame] = useState(null);
  const [showNewGame, setShowNewGame] = useState(false);
  const [h2hP1, setH2hP1] = useState('SHAW');
  const [h2hP2, setH2hP2] = useState('AADI');
  const [predP1, setPredP1] = useState('SHAW');
  const [predP2, setPredP2] = useState('AADI');
  const [predT1, setPredT1] = useState('Indiana');
  const [predT2, setPredT2] = useState('Ohio State');
  const [saveStatus, setSaveStatus] = useState('');
  
  // Auto-save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('quadcfb-players-v2', JSON.stringify(players));
      localStorage.setItem('quadcfb-games-v2', JSON.stringify(games));
      localStorage.setItem('quadcfb-dark', JSON.stringify(dark));
      setSaveStatus('✓ Saved');
      const timer = setTimeout(() => setSaveStatus(''), 1500);
      return () => clearTimeout(timer);
    } catch (e) {
      console.error('Save failed:', e);
      setSaveStatus('⚠ Save failed');
    }
  }, [players, games, dark]);
  
  // New game form state
  const [newHome, setNewHome] = useState('SHAW');
  const [newAway, setNewAway] = useState('AADI');
  const [newTeamH, setNewTeamH] = useState('Indiana');
  const [newTeamA, setNewTeamA] = useState('Ohio State');
  const [newScoreH, setNewScoreH] = useState('');
  const [newScoreA, setNewScoreA] = useState('');
  
  // New player form state
  const [showNewPlayer, setShowNewPlayer] = useState(false);
  const [newPlayerName, setNewPlayerName] = useState('');
  
  // Edit game state
  const [editGame, setEditGame] = useState(null);
  const [editScoreH, setEditScoreH] = useState('');
  const [editScoreA, setEditScoreA] = useState('');
  const [editTeamH, setEditTeamH] = useState('');
  const [editTeamA, setEditTeamA] = useState('');
  
  // Game sorting
  const [gameSort, setGameSort] = useState('newest'); // newest, oldest, margin, points, date
  
  // Player stats view
  const [viewPlayer, setViewPlayer] = useState('SHAW');

  // Calculate all player stats dynamically from games
  const calculatePlayerStats = (playerName) => {
    const playerGames = games.filter(g => g.home === playerName || g.away === playerName);
    let wins = 0, losses = 0, points = 0;
    
    playerGames.forEach(g => {
      const isHome = g.home === playerName;
      const myScore = isHome ? g.scoreH : g.scoreA;
      const oppScore = isHome ? g.scoreA : g.scoreH;
      points += myScore;
      if (myScore > oppScore) wins++;
      else losses++;
    });
    
    return {
      gp: playerGames.length,
      wins,
      losses,
      points,
      elo: players[playerName]?.elo || 1500,
      peakElo: players[playerName]?.peakElo || 1500
    };
  };

  const sorted = Object.keys(players).map(name => {
    const stats = calculatePlayerStats(name);
    return { 
      name, 
      ...stats, 
      streak: getStreak(name, games) 
    };
  }).sort((a, b) => b.elo - a.elo);
  
  const teams = Object.keys(teamElos).sort((a,b) => teamElos[b] - teamElos[a]);
  const prediction = getPrediction(predP1, predP2, predT1, predT2, players);
  const h2h = getH2H(h2hP1, h2hP2, games);
  
  // Sort games based on selection
  const sortedGames = [...games].sort((a, b) => {
    switch (gameSort) {
      case 'oldest': return a.id - b.id;
      case 'margin': return Math.abs(b.scoreH - b.scoreA) - Math.abs(a.scoreH - a.scoreA);
      case 'points': return (b.scoreH + b.scoreA) - (a.scoreH + a.scoreA);
      case 'date': 
        // Games with dates first (newest date first), then undated games by id
        if (a.date && b.date) return b.date.localeCompare(a.date);
        if (a.date && !b.date) return -1;
        if (!a.date && b.date) return 1;
        return b.id - a.id;
      case 'newest':
      default: return b.id - a.id;
    }
  });
  
  // Format date for display
  const formatDate = (dateStr) => {
    if (!dateStr) return 'Pre-Tracked';
    const [year, month, day] = dateStr.split('-').map(Number);
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    if (dateStr === todayStr) return 'Today';
    if (dateStr === yesterdayStr) return 'Yesterday';
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${monthNames[month - 1]} ${day}`;
  };
  
  const handleAddGame = () => {
    if (!newScoreH || !newScoreA) return;
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
    const newGame = {
      id: games.length + 1,
      home: newHome,
      away: newAway,
      teamH: newTeamH,
      teamA: newTeamA,
      scoreH: parseInt(newScoreH),
      scoreA: parseInt(newScoreA),
      session: 4,
      date: today
    };
    setGames([...games, newGame]);
    
    // Update Elo ratings
    const homeWon = newGame.scoreH > newGame.scoreA;
    const winner = homeWon ? newHome : newAway;
    const loser = homeWon ? newAway : newHome;
    const margin = Math.abs(newGame.scoreH - newGame.scoreA);
    
    // Calculate Elo change
    const K = 32;
    const winnerElo = players[winner]?.elo || 1500;
    const loserElo = players[loser]?.elo || 1500;
    const expected = 1 / (1 + Math.pow(10, (loserElo - winnerElo) / 400));
    const mov = Math.max(0.5, Math.min(2.0, Math.log(margin + 1) * 0.8));
    const eloGain = Math.round(K * (1 - expected) * mov);
    const eloLoss = Math.round(eloGain * 0.95);
    
    const newWinnerElo = winnerElo + eloGain;
    const newLoserElo = loserElo - eloLoss;
    
    setPlayers(prev => ({
      ...prev,
      [winner]: {
        ...prev[winner],
        elo: newWinnerElo,
        peakElo: Math.max(prev[winner]?.peakElo || 1500, newWinnerElo)
      },
      [loser]: {
        ...prev[loser],
        elo: newLoserElo,
        peakElo: prev[loser]?.peakElo || 1500
      }
    }));
    
    setShowNewGame(false);
    setNewScoreH('');
    setNewScoreA('');
  };
  
  const handleAddPlayer = () => {
    if (!newPlayerName.trim()) return;
    const name = newPlayerName.trim().toUpperCase();
    if (players[name]) {
      alert('Player already exists!');
      return;
    }
    setPlayers(prev => ({
      ...prev,
      [name]: { elo: 1500, peakElo: 1500 }
    }));
    setShowNewPlayer(false);
    setNewPlayerName('');
  };
  
  const handleStartEdit = (game) => {
    setEditGame(game);
    setEditScoreH(game.scoreH.toString());
    setEditScoreA(game.scoreA.toString());
    setEditTeamH(game.teamH);
    setEditTeamA(game.teamA);
    setSelGame(null);
  };
  
  const handleSaveEdit = () => {
    if (!editGame || !editScoreH || !editScoreA) return;
    
    setGames(prev => prev.map(g => {
      if (g.id === editGame.id) {
        return {
          ...g,
          scoreH: parseInt(editScoreH),
          scoreA: parseInt(editScoreA),
          teamH: editTeamH,
          teamA: editTeamA
        };
      }
      return g;
    }));
    
    // Recalculate all Elos from scratch
    recalculateAllElos();
    
    setEditGame(null);
  };
  
  const handleDeleteGame = (gameId) => {
    if (!confirm('Delete this game? This will recalculate all Elos.')) return;
    
    setGames(prev => prev.filter(g => g.id !== gameId));
    recalculateAllElos();
    setEditGame(null);
    setSelGame(null);
  };
  
  const recalculateAllElos = () => {
    // Recalculate Elos for all players based on games
    const newElos = {};
    Object.keys(players).forEach(p => {
      newElos[p] = { elo: 1500, peakElo: 1500 };
    });
    
    games.forEach(g => {
      const homeWon = g.scoreH > g.scoreA;
      const winner = homeWon ? g.home : g.away;
      const loser = homeWon ? g.away : g.home;
      const margin = Math.abs(g.scoreH - g.scoreA);
      
      const K = 32;
      const winnerElo = newElos[winner]?.elo || 1500;
      const loserElo = newElos[loser]?.elo || 1500;
      const expected = 1 / (1 + Math.pow(10, (loserElo - winnerElo) / 400));
      const mov = Math.max(0.5, Math.min(2.0, Math.log(margin + 1) * 0.8));
      const eloGain = Math.round(K * (1 - expected) * mov);
      const eloLoss = Math.round(eloGain * 0.95);
      
      newElos[winner] = {
        elo: winnerElo + eloGain,
        peakElo: Math.max(newElos[winner]?.peakElo || 1500, winnerElo + eloGain)
      };
      newElos[loser] = {
        elo: loserElo - eloLoss,
        peakElo: newElos[loser]?.peakElo || 1500
      };
    });
    
    setPlayers(prev => {
      const updated = { ...prev };
      Object.keys(newElos).forEach(p => {
        updated[p] = { ...updated[p], ...newElos[p] };
      });
      return updated;
    });
  };

  // Generate playoff bracket (top 4 or 8 players)
  const generatePlayoffBracket = () => {
    const eligible = sorted.filter(p => p.gp >= 1).slice(0, 8);
    if (eligible.length < 4) return null;
    
    const bracketSize = eligible.length >= 8 ? 8 : 4;
    const seeds = eligible.slice(0, bracketSize);
    
    // Create matchups: 1v8, 4v5, 2v7, 3v6 (or 1v4, 2v3 for 4-team)
    const round1 = bracketSize === 8 ? [
      { seed1: 1, seed2: 8, p1: seeds[0], p2: seeds[7] },
      { seed1: 4, seed2: 5, p1: seeds[3], p2: seeds[4] },
      { seed1: 2, seed2: 7, p1: seeds[1], p2: seeds[6] },
      { seed1: 3, seed2: 6, p1: seeds[2], p2: seeds[5] },
    ] : [
      { seed1: 1, seed2: 4, p1: seeds[0], p2: seeds[3] },
      { seed1: 2, seed2: 3, p1: seeds[1], p2: seeds[2] },
    ];
    
    return { seeds, round1, bracketSize };
  };
  
  // Generate recommended matchups
  const getRecommendedMatchups = () => {
    const eligible = sorted.filter(p => p.gp >= 1);
    if (eligible.length < 2) return [];
    
    const matchups = [];
    
    // 1. Rivalry Rematch - close Elo players who've played before
    for (let i = 0; i < eligible.length - 1; i++) {
      for (let j = i + 1; j < eligible.length; j++) {
        const h2hData = getH2H(eligible[i].name, eligible[j].name, games);
        const eloDiff = Math.abs(eligible[i].elo - eligible[j].elo);
        if (h2hData.games >= 2 && eloDiff < 150) {
          matchups.push({
            type: '🔥 Rivalry Rematch',
            p1: eligible[i].name,
            p2: eligible[j].name,
            reason: `${h2hData.w1}-${h2hData.w2} H2H, ${eloDiff} Elo diff`,
            excitement: 95
          });
          break;
        }
      }
      if (matchups.length >= 1) break;
    }
    
    // 2. Upset Special - lower ranked player on a streak vs higher ranked
    const hotLowerPlayer = eligible.slice(3).find(p => p.streak.type === 'W' && p.streak.count >= 2);
    if (hotLowerPlayer) {
      const topPlayer = eligible[0];
      matchups.push({
        type: '😱 Upset Special',
        p1: hotLowerPlayer.name,
        p2: topPlayer.name,
        reason: `${hotLowerPlayer.name} on ${hotLowerPlayer.streak.count}-game win streak`,
        excitement: 88
      });
    }
    
    // 3. Even Matchup - closest Elo players
    let closestDiff = Infinity;
    let closestPair = null;
    for (let i = 0; i < eligible.length - 1; i++) {
      for (let j = i + 1; j < eligible.length; j++) {
        const diff = Math.abs(eligible[i].elo - eligible[j].elo);
        if (diff < closestDiff && diff > 0) {
          closestDiff = diff;
          closestPair = [eligible[i], eligible[j]];
        }
      }
    }
    if (closestPair) {
      matchups.push({
        type: '⚖️ Even Matchup',
        p1: closestPair[0].name,
        p2: closestPair[1].name,
        reason: `Only ${closestDiff} Elo difference`,
        excitement: 85
      });
    }
    
    // 4. Redemption Game - someone on losing streak vs beatable opponent
    const coldPlayer = eligible.find(p => p.streak.type === 'L' && p.streak.count >= 2);
    if (coldPlayer) {
      const beatable = eligible.find(p => p.elo < coldPlayer.elo && p.name !== coldPlayer.name);
      if (beatable) {
        matchups.push({
          type: '💪 Redemption Game',
          p1: coldPlayer.name,
          p2: beatable.name,
          reason: `${coldPlayer.name} needs a bounce-back win`,
          excitement: 75
        });
      }
    }
    
    // 5. Title Contender Clash - top 2 players
    if (eligible.length >= 2) {
      matchups.push({
        type: '👑 Title Clash',
        p1: eligible[0].name,
        p2: eligible[1].name,
        reason: `#1 vs #2 for bragging rights`,
        excitement: 92
      });
    }
    
    return matchups.slice(0, 5);
  };
  
  const bracket = generatePlayoffBracket();
  const recommended = getRecommendedMatchups();

  const bg = dark ? '#1a1a1a' : '#f5f5f7';
  const card = dark ? '#2d2d2d' : '#fff';
  const text = dark ? '#fff' : '#1d1d1f';
  const sub = dark ? '#888' : '#666';

  return (
    <div style={{ minHeight: '100vh', backgroundColor: bg, color: text, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #1d1d1f 0%, #2d2d2d 100%)', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ margin: 0, color: '#fff', fontSize: '24px' }}>🏈 Quad CFB</h1>
          <p style={{ margin: '4px 0 0', color: '#888', fontSize: '14px' }}>
            Ultimate League Tracker
            {saveStatus && <span style={{ marginLeft: '8px', color: saveStatus.includes('✓') ? '#34C759' : '#FF9500' }}>{saveStatus}</span>}
          </p>
        </div>
        <button onClick={() => setDark(!dark)} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}>
          {dark ? '☀️' : '🌙'}
        </button>
      </div>

      {/* Nav */}
      <div style={{ display: 'flex', gap: '8px', padding: '12px', backgroundColor: dark ? '#252525' : '#e5e5e5', overflowX: 'auto' }}>
        {[['leaderboard', '🏆'], ['games', '🎮'], ['predict', '🎯'], ['playoff', '🏅'], ['matchups', '💡'], ['h2h', '⚔️'], ['players', '👤'], ['rivals', '🔥'], ['stats', '📊']].map(([t, icon]) => (
          <button key={t} onClick={() => setTab(t)} style={{
            padding: '10px 16px', borderRadius: '20px', border: 'none', cursor: 'pointer',
            backgroundColor: tab === t ? '#007AFF' : 'transparent',
            color: tab === t ? '#fff' : text, fontWeight: '600', fontSize: '14px', whiteSpace: 'nowrap'
          }}>
            {icon} {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ padding: '16px', maxWidth: '800px', margin: '0 auto' }}>
        
        {/* LEADERBOARD */}
        {tab === 'leaderboard' && (
          <div style={{ backgroundColor: card, borderRadius: '16px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ margin: 0, fontSize: '20px' }}>Power Rankings</h2>
              <button onClick={() => setShowNewPlayer(true)} style={{ padding: '10px 20px', backgroundColor: '#34C759', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: '600', cursor: 'pointer' }}>
                + Add Player
              </button>
            </div>
            {/* Column Headers */}
            <div style={{ display: 'flex', alignItems: 'center', padding: '8px 12px', borderBottom: `1px solid ${dark ? '#444' : '#e0e0e0'}`, marginBottom: '8px' }}>
              <span style={{ width: '30px', fontSize: '11px', color: sub, fontWeight: '600' }}>#</span>
              <span style={{ flex: 1, fontSize: '11px', color: sub, fontWeight: '600' }}>PLAYER</span>
              <span style={{ width: '60px', fontSize: '11px', color: sub, fontWeight: '600' }}>RECORD</span>
              <span style={{ width: '50px', fontSize: '11px', color: sub, fontWeight: '600' }}>STRK</span>
              <span style={{ width: '50px', fontSize: '11px', color: sub, fontWeight: '600' }}>PPG</span>
              <span style={{ width: '60px', fontSize: '11px', color: sub, fontWeight: '600', textAlign: 'right' }}>ELO</span>
            </div>
            {sorted.map((p, i) => (
              <div key={p.name} style={{ display: 'flex', alignItems: 'center', padding: '12px', backgroundColor: i % 2 ? (dark ? '#333' : '#f9f9f9') : 'transparent', borderRadius: '8px', marginBottom: '4px' }}>
                <span style={{ width: '30px', fontWeight: '700', fontSize: '18px' }}>
                  {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : i + 1}
                </span>
                <span style={{ flex: 1, fontWeight: '600' }}>{p.name}</span>
                <span style={{ width: '60px', color: sub }}>{p.wins}-{p.losses}</span>
                <span style={{ width: '50px', fontWeight: '600', color: p.streak.type === 'W' ? '#34C759' : p.streak.type === 'L' ? '#FF3B30' : sub }}>
                  {p.streak.type ? `${p.streak.type}${p.streak.count}` : '—'}
                </span>
                <span style={{ width: '50px', color: sub }}>{p.gp > 0 ? (p.points/p.gp).toFixed(1) : '—'}</span>
                <span style={{ width: '60px', fontWeight: '700', textAlign: 'right' }}>{p.elo}</span>
              </div>
            ))}
          </div>
        )}

        {/* GAMES */}
        {tab === 'games' && (
          <div style={{ backgroundColor: card, borderRadius: '16px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
              <h2 style={{ margin: 0, fontSize: '20px' }}>Game History</h2>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <select 
                  value={gameSort} 
                  onChange={e => setGameSort(e.target.value)}
                  style={{ padding: '8px 12px', borderRadius: '8px', border: `1px solid ${dark ? '#444' : '#ddd'}`, backgroundColor: dark ? '#333' : '#fff', color: text, fontSize: '14px' }}
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="date">By Date</option>
                  <option value="margin">Biggest Margin</option>
                  <option value="points">Highest Scoring</option>
                </select>
                <button onClick={() => setShowNewGame(true)} style={{ padding: '10px 20px', backgroundColor: '#007AFF', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: '600', cursor: 'pointer' }}>
                  + New Game
                </button>
              </div>
            </div>
            {sortedGames.map(g => {
              const homeWon = g.scoreH > g.scoreA;
              return (
                <div key={g.id} onClick={() => setSelGame(g)} style={{ padding: '12px', backgroundColor: dark ? '#333' : '#f9f9f9', borderRadius: '12px', marginBottom: '8px', cursor: 'pointer' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: sub, marginBottom: '8px' }}>
                    <span>Game {g.id}</span>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <span style={{ color: g.date ? '#007AFF' : sub }}>{formatDate(g.date)}</span>
                      <span>S{g.session}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ textAlign: 'center', flex: 1 }}>
                      <div style={{ fontWeight: '600', color: homeWon ? '#34C759' : text }}>{g.home}</div>
                      <div style={{ fontSize: '12px', color: sub }}>{g.teamH}</div>
                      <div style={{ fontSize: '24px', fontWeight: '700', color: homeWon ? '#34C759' : sub }}>{g.scoreH}</div>
                    </div>
                    <div style={{ padding: '0 16px', color: sub }}>VS</div>
                    <div style={{ textAlign: 'center', flex: 1 }}>
                      <div style={{ fontWeight: '600', color: !homeWon ? '#34C759' : text }}>{g.away}</div>
                      <div style={{ fontSize: '12px', color: sub }}>{g.teamA}</div>
                      <div style={{ fontSize: '24px', fontWeight: '700', color: !homeWon ? '#34C759' : sub }}>{g.scoreA}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* PREDICT */}
        {tab === 'predict' && (
          <div style={{ backgroundColor: card, borderRadius: '16px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <h2 style={{ margin: '0 0 16px', fontSize: '20px' }}>🎯 Game Predictor</h2>
            
            <div style={{ display: 'flex', gap: '16px', marginBottom: '20px', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: '120px' }}>
                <label style={{ fontSize: '12px', color: sub }}>Player 1</label>
                <select value={predP1} onChange={e => setPredP1(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: `1px solid ${dark ? '#444' : '#ddd'}`, backgroundColor: dark ? '#333' : '#fff', color: text }}>
                  {Object.keys(players).map(p => <option key={p} value={p}>{p}</option>)}
                </select>
                <select value={predT1} onChange={e => setPredT1(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '8px', border: `1px solid ${dark ? '#444' : '#ddd'}`, backgroundColor: dark ? '#333' : '#fff', color: text, marginTop: '8px', fontSize: '12px' }}>
                  {teams.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', fontWeight: '700', color: sub }}>VS</div>
              <div style={{ flex: 1, minWidth: '120px' }}>
                <label style={{ fontSize: '12px', color: sub }}>Player 2</label>
                <select value={predP2} onChange={e => setPredP2(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: `1px solid ${dark ? '#444' : '#ddd'}`, backgroundColor: dark ? '#333' : '#fff', color: text }}>
                  {Object.keys(players).map(p => <option key={p} value={p}>{p}</option>)}
                </select>
                <select value={predT2} onChange={e => setPredT2(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '8px', border: `1px solid ${dark ? '#444' : '#ddd'}`, backgroundColor: dark ? '#333' : '#fff', color: text, marginTop: '8px', fontSize: '12px' }}>
                  {teams.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>

            {/* Prediction Results */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '20px' }}>
              <div style={{ backgroundColor: dark ? '#333' : '#f5f5f5', padding: '16px', borderRadius: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: '12px', color: sub, marginBottom: '4px' }}>SPREAD</div>
                <div style={{ fontSize: '20px', fontWeight: '700' }}>{prediction.fav} {prediction.spread}</div>
              </div>
              <div style={{ backgroundColor: dark ? '#333' : '#f5f5f5', padding: '16px', borderRadius: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: '12px', color: sub, marginBottom: '4px' }}>MONEYLINE</div>
                <div style={{ fontSize: '14px' }}>{predP1}: <strong style={{ color: prediction.ml1 < 0 ? '#34C759' : '#FF9500' }}>{prediction.ml1 > 0 ? '+' : ''}{prediction.ml1}</strong></div>
                <div style={{ fontSize: '14px' }}>{predP2}: <strong style={{ color: prediction.ml2 < 0 ? '#34C759' : '#FF9500' }}>{prediction.ml2 > 0 ? '+' : ''}{prediction.ml2}</strong></div>
              </div>
              <div style={{ backgroundColor: dark ? '#333' : '#f5f5f5', padding: '16px', borderRadius: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: '12px', color: sub, marginBottom: '4px' }}>WIN PROB</div>
                <div style={{ fontSize: '14px' }}>{predP1}: <strong style={{ color: '#34C759' }}>{prediction.prob1}%</strong></div>
                <div style={{ fontSize: '14px' }}>{predP2}: <strong style={{ color: '#FF9500' }}>{prediction.prob2}%</strong></div>
              </div>
            </div>

            {/* Probability Bar */}
            <div style={{ height: '24px', borderRadius: '12px', overflow: 'hidden', display: 'flex', marginBottom: '20px' }}>
              <div style={{ width: `${prediction.prob1}%`, backgroundColor: '#34C759', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '12px', fontWeight: '600' }}>
                {prediction.prob1}%
              </div>
              <div style={{ width: `${prediction.prob2}%`, backgroundColor: '#FF9500', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '12px', fontWeight: '600' }}>
                {prediction.prob2}%
              </div>
            </div>
            
            {/* Elo Stakes */}
            {(() => {
              const p1Elo = players[predP1]?.elo || 1500;
              const p2Elo = players[predP2]?.elo || 1500;
              const K = 32;
              const avgMargin = 14; // Assume average margin for calculation
              const mov = Math.max(0.5, Math.min(2.0, Math.log(avgMargin + 1) * 0.8));
              
              // If P1 wins
              const expectedP1 = 1 / (1 + Math.pow(10, (p2Elo - p1Elo) / 400));
              const p1WinGain = Math.round(K * (1 - expectedP1) * mov);
              const p1LoseLoss = Math.round(K * expectedP1 * mov * 0.95);
              
              // If P2 wins
              const expectedP2 = 1 / (1 + Math.pow(10, (p1Elo - p2Elo) / 400));
              const p2WinGain = Math.round(K * (1 - expectedP2) * mov);
              const p2LoseLoss = Math.round(K * expectedP2 * mov * 0.95);
              
              return (
                <div style={{ marginBottom: '0' }}>
                  <div style={{ fontSize: '12px', color: sub, marginBottom: '8px', fontWeight: '600' }}>ELO STAKES</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div style={{ backgroundColor: dark ? '#333' : '#f5f5f5', padding: '16px', borderRadius: '12px' }}>
                      <div style={{ fontWeight: '700', marginBottom: '8px', textAlign: 'center' }}>{predP1}</div>
                      <div style={{ fontSize: '13px', color: sub, marginBottom: '4px' }}>Current: <strong style={{ color: text }}>{p1Elo}</strong></div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: '10px', color: sub }}>IF WIN</div>
                          <div style={{ color: '#34C759', fontWeight: '700' }}>+{p1WinGain}</div>
                          <div style={{ fontSize: '11px', color: sub }}>→ {p1Elo + p1WinGain}</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: '10px', color: sub }}>IF LOSE</div>
                          <div style={{ color: '#FF3B30', fontWeight: '700' }}>-{p1LoseLoss}</div>
                          <div style={{ fontSize: '11px', color: sub }}>→ {p1Elo - p1LoseLoss}</div>
                        </div>
                      </div>
                    </div>
                    <div style={{ backgroundColor: dark ? '#333' : '#f5f5f5', padding: '16px', borderRadius: '12px' }}>
                      <div style={{ fontWeight: '700', marginBottom: '8px', textAlign: 'center' }}>{predP2}</div>
                      <div style={{ fontSize: '13px', color: sub, marginBottom: '4px' }}>Current: <strong style={{ color: text }}>{p2Elo}</strong></div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: '10px', color: sub }}>IF WIN</div>
                          <div style={{ color: '#34C759', fontWeight: '700' }}>+{p2WinGain}</div>
                          <div style={{ fontSize: '11px', color: sub }}>→ {p2Elo + p2WinGain}</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: '10px', color: sub }}>IF LOSE</div>
                          <div style={{ color: '#FF3B30', fontWeight: '700' }}>-{p2LoseLoss}</div>
                          <div style={{ fontSize: '11px', color: sub }}>→ {p2Elo - p2LoseLoss}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div style={{ fontSize: '11px', color: sub, textAlign: 'center', marginTop: '8px' }}>
                    *Based on average margin. Blowouts = more Elo, close games = less.
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* PLAYOFF BRACKET */}
        {tab === 'playoff' && (
          <div style={{ backgroundColor: card, borderRadius: '16px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <h2 style={{ margin: '0 0 4px', fontSize: '24px' }}>🏆 Playoff Bracket</h2>
              <p style={{ margin: 0, color: sub, fontSize: '14px' }}>Based on current Elo rankings</p>
            </div>
            
            {!bracket ? (
              <div style={{ textAlign: 'center', padding: '40px', color: sub }}>
                <div style={{ fontSize: '48px' }}>🏈</div>
                <p>Need at least 4 players with games to generate bracket</p>
              </div>
            ) : (
              <>
                {/* Seeds Row */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '24px' }}>
                  {bracket.seeds.slice(0, 4).map((p, i) => (
                    <div key={p.name} style={{ 
                      padding: '12px 8px',
                      background: i === 0 ? 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)' : 
                                 i === 1 ? 'linear-gradient(135deg, #C0C0C0 0%, #A0A0A0 100%)' :
                                 i === 2 ? 'linear-gradient(135deg, #CD7F32 0%, #8B4513 100%)' :
                                 (dark ? '#333' : '#f0f0f0'),
                      borderRadius: '12px',
                      textAlign: 'center',
                      color: i < 3 ? '#000' : text
                    }}>
                      <div style={{ fontSize: '11px', fontWeight: '600', opacity: 0.8 }}>#{i + 1} SEED</div>
                      <div style={{ fontSize: '16px', fontWeight: '800', marginTop: '4px' }}>{p.name}</div>
                      <div style={{ fontSize: '12px', opacity: 0.8 }}>{p.elo} Elo</div>
                    </div>
                  ))}
                </div>

                {/* Bracket Visual */}
                <div style={{ backgroundColor: dark ? '#252525' : '#f8f8f8', borderRadius: '16px', padding: '20px' }}>
                  
                  {/* Semifinals */}
                  <div style={{ fontSize: '12px', color: sub, fontWeight: '700', marginBottom: '12px', textAlign: 'center', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Semifinals
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                    {bracket.round1.slice(0, 2).map((matchup, i) => {
                      const pred = getPrediction(matchup.p1.name, matchup.p2.name, 'Georgia', 'Ohio State', players);
                      const isFav1 = parseInt(pred.prob1) > parseInt(pred.prob2);
                      return (
                        <div key={i} style={{ 
                          backgroundColor: dark ? '#333' : '#fff', 
                          borderRadius: '12px', 
                          overflow: 'hidden',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                        }}>
                          {/* Matchup Header */}
                          <div style={{ 
                            backgroundColor: dark ? '#444' : '#e8e8e8', 
                            padding: '8px 12px', 
                            fontSize: '11px', 
                            fontWeight: '600', 
                            color: sub,
                            textAlign: 'center'
                          }}>
                            GAME {i + 1}
                          </div>
                          
                          {/* Player 1 */}
                          <div style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center', 
                            padding: '12px',
                            borderBottom: `1px solid ${dark ? '#444' : '#eee'}`,
                            backgroundColor: isFav1 ? (dark ? '#34C75915' : '#34C75910') : 'transparent'
                          }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <span style={{ 
                                width: '24px', 
                                height: '24px', 
                                borderRadius: '6px', 
                                backgroundColor: matchup.seed1 === 1 ? '#FFD700' : (dark ? '#555' : '#ddd'),
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '12px',
                                fontWeight: '700',
                                color: matchup.seed1 === 1 ? '#000' : text
                              }}>{matchup.seed1}</span>
                              <span style={{ fontWeight: '700' }}>{matchup.p1.name}</span>
                            </div>
                            <span style={{ 
                              fontWeight: '700', 
                              color: isFav1 ? '#34C759' : sub,
                              fontSize: '14px'
                            }}>{pred.prob1}%</span>
                          </div>
                          
                          {/* Player 2 */}
                          <div style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center', 
                            padding: '12px',
                            backgroundColor: !isFav1 ? (dark ? '#34C75915' : '#34C75910') : 'transparent'
                          }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <span style={{ 
                                width: '24px', 
                                height: '24px', 
                                borderRadius: '6px', 
                                backgroundColor: dark ? '#555' : '#ddd',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '12px',
                                fontWeight: '700'
                              }}>{matchup.seed2}</span>
                              <span style={{ fontWeight: '700' }}>{matchup.p2.name}</span>
                            </div>
                            <span style={{ 
                              fontWeight: '700', 
                              color: !isFav1 ? '#34C759' : sub,
                              fontSize: '14px'
                            }}>{pred.prob2}%</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  {/* Arrow Down */}
                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <div style={{ fontSize: '24px', color: sub }}>↓</div>
                  </div>
                  
                  {/* Championship */}
                  <div style={{ fontSize: '12px', color: '#FFD700', fontWeight: '700', marginBottom: '12px', textAlign: 'center', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    🏆 Championship
                  </div>
                  
                  <div style={{ 
                    background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                    borderRadius: '12px',
                    padding: '20px',
                    textAlign: 'center'
                  }}>
                    {(() => {
                      const champPred = getPrediction(bracket.seeds[0].name, bracket.seeds[1].name, 'Georgia', 'Ohio State', players);
                      return (
                        <>
                          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', marginBottom: '12px' }}>
                            <div style={{ textAlign: 'center' }}>
                              <div style={{ fontSize: '11px', color: '#00000080' }}>#1 SEED</div>
                              <div style={{ fontSize: '20px', fontWeight: '800', color: '#000' }}>{bracket.seeds[0].name}</div>
                              <div style={{ fontSize: '14px', fontWeight: '600', color: '#000' }}>{champPred.prob1}%</div>
                            </div>
                            <div style={{ fontSize: '18px', fontWeight: '700', color: '#00000060' }}>VS</div>
                            <div style={{ textAlign: 'center' }}>
                              <div style={{ fontSize: '11px', color: '#00000080' }}>#2 SEED</div>
                              <div style={{ fontSize: '20px', fontWeight: '800', color: '#000' }}>{bracket.seeds[1].name}</div>
                              <div style={{ fontSize: '14px', fontWeight: '600', color: '#000' }}>{champPred.prob2}%</div>
                            </div>
                          </div>
                          <div style={{ fontSize: '12px', color: '#00000080' }}>
                            Spread: {champPred.fav} {champPred.spread}
                          </div>
                        </>
                      );
                    })()}
                  </div>
                </div>
                
                {/* Fun Stats */}
                <div style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div style={{ backgroundColor: dark ? '#333' : '#f5f5f5', padding: '16px', borderRadius: '12px', textAlign: 'center' }}>
                    <div style={{ fontSize: '12px', color: sub, marginBottom: '4px' }}>FAVORITE</div>
                    <div style={{ fontSize: '18px', fontWeight: '700' }}>🥇 {bracket.seeds[0].name}</div>
                  </div>
                  <div style={{ backgroundColor: dark ? '#333' : '#f5f5f5', padding: '16px', borderRadius: '12px', textAlign: 'center' }}>
                    <div style={{ fontSize: '12px', color: sub, marginBottom: '4px' }}>CINDERELLA</div>
                    <div style={{ fontSize: '18px', fontWeight: '700' }}>✨ {bracket.seeds[3]?.name || bracket.seeds[bracket.seeds.length - 1].name}</div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* RECOMMENDED MATCHUPS */}
        {tab === 'matchups' && (
          <div style={{ backgroundColor: card, borderRadius: '16px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <h2 style={{ margin: '0 0 8px', fontSize: '20px' }}>💡 Recommended Matchups</h2>
            <p style={{ color: sub, margin: '0 0 20px', fontSize: '14px' }}>Games that would be exciting to play right now</p>
            
            {recommended.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px', color: sub }}>
                <div style={{ fontSize: '48px' }}>🎮</div>
                <p>Need more players with games to generate recommendations</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {recommended.map((m, i) => {
                  const pred = getPrediction(m.p1, m.p2, 'Georgia', 'Ohio State', players);
                  return (
                    <div key={i} style={{ 
                      backgroundColor: dark ? '#333' : '#f5f5f5', 
                      borderRadius: '12px', 
                      padding: '16px',
                      borderLeft: `4px solid ${m.excitement >= 90 ? '#FF3B30' : m.excitement >= 80 ? '#FF9500' : '#34C759'}`
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                        <div>
                          <span style={{ fontSize: '16px', fontWeight: '700' }}>{m.type}</span>
                          <div style={{ fontSize: '12px', color: sub, marginTop: '4px' }}>{m.reason}</div>
                        </div>
                        <div style={{ 
                          backgroundColor: m.excitement >= 90 ? '#FF3B30' : m.excitement >= 80 ? '#FF9500' : '#34C759',
                          color: '#fff',
                          padding: '4px 10px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: '700'
                        }}>
                          🔥 {m.excitement}
                        </div>
                      </div>
                      
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: dark ? '#252525' : '#fff', borderRadius: '8px', padding: '12px' }}>
                        <div style={{ textAlign: 'center', flex: 1 }}>
                          <div style={{ fontWeight: '700', fontSize: '18px' }}>{m.p1}</div>
                          <div style={{ color: '#34C759', fontWeight: '600' }}>{pred.prob1}%</div>
                        </div>
                        <div style={{ color: sub, fontWeight: '700' }}>VS</div>
                        <div style={{ textAlign: 'center', flex: 1 }}>
                          <div style={{ fontWeight: '700', fontSize: '18px' }}>{m.p2}</div>
                          <div style={{ color: '#FF9500', fontWeight: '600' }}>{pred.prob2}%</div>
                        </div>
                      </div>
                      
                      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '12px' }}>
                        <button 
                          onClick={() => { setPredP1(m.p1); setPredP2(m.p2); setTab('predict'); }}
                          style={{ 
                            padding: '8px 16px', 
                            backgroundColor: '#007AFF', 
                            color: '#fff', 
                            border: 'none', 
                            borderRadius: '8px', 
                            fontWeight: '600', 
                            cursor: 'pointer',
                            fontSize: '12px'
                          }}
                        >
                          View Full Prediction →
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* H2H */}
        {tab === 'h2h' && (
          <div style={{ backgroundColor: card, borderRadius: '16px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <h2 style={{ margin: '0 0 16px', fontSize: '20px' }}>⚔️ Head-to-Head</h2>
            
            <div style={{ display: 'flex', gap: '16px', marginBottom: '20px', alignItems: 'center' }}>
              <select value={h2hP1} onChange={e => setH2hP1(e.target.value)} style={{ flex: 1, padding: '12px', borderRadius: '8px', border: `1px solid ${dark ? '#444' : '#ddd'}`, backgroundColor: dark ? '#333' : '#fff', color: text, fontWeight: '600' }}>
                {Object.keys(players).map(p => <option key={p} value={p}>{p}</option>)}
              </select>
              <span style={{ fontWeight: '700', color: sub }}>VS</span>
              <select value={h2hP2} onChange={e => setH2hP2(e.target.value)} style={{ flex: 1, padding: '12px', borderRadius: '8px', border: `1px solid ${dark ? '#444' : '#ddd'}`, backgroundColor: dark ? '#333' : '#fff', color: text, fontWeight: '600' }}>
                {Object.keys(players).map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>

            {h2h.games === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px', color: sub }}>
                <div style={{ fontSize: '48px' }}>🤷</div>
                <p>No games between {h2hP1} and {h2hP2}</p>
              </div>
            ) : (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center', marginBottom: '20px' }}>
                  <div>
                    <div style={{ fontSize: '48px', fontWeight: '800', color: h2h.w1 > h2h.w2 ? '#34C759' : text }}>{h2h.w1}</div>
                    <div style={{ fontWeight: '600' }}>{h2hP1}</div>
                  </div>
                  <div style={{ color: sub }}>
                    <div style={{ fontSize: '24px', fontWeight: '700' }}>{h2h.games}</div>
                    <div>games</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '48px', fontWeight: '800', color: h2h.w2 > h2h.w1 ? '#34C759' : text }}>{h2h.w2}</div>
                    <div style={{ fontWeight: '600' }}>{h2hP2}</div>
                  </div>
                </div>
                <div>
                  {h2h.details.map(g => {
                    const p1Home = g.home === h2hP1;
                    const p1Score = p1Home ? g.scoreH : g.scoreA;
                    const p2Score = p1Home ? g.scoreA : g.scoreH;
                    return (
                      <div key={g.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', backgroundColor: dark ? '#333' : '#f9f9f9', borderRadius: '8px', marginBottom: '4px' }}>
                        <span style={{ color: sub }}>G{g.id}</span>
                        <span style={{ fontWeight: '600', color: p1Score > p2Score ? '#34C759' : text }}>{h2hP1} {p1Score}</span>
                        <span style={{ color: sub }}>-</span>
                        <span style={{ fontWeight: '600', color: p2Score > p1Score ? '#34C759' : text }}>{p2Score} {h2hP2}</span>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        )}

        {/* PLAYERS - Individual Stats */}
        {tab === 'players' && (() => {
          const pStats = calculatePlayerStats(viewPlayer);
          const p = players[viewPlayer];
          const playerGames = games.filter(g => g.home === viewPlayer || g.away === viewPlayer);
          const recentGames = [...playerGames].reverse().slice(0, 5);
          
          // Calculate additional stats
          const totalPoints = playerGames.reduce((sum, g) => sum + (g.home === viewPlayer ? g.scoreH : g.scoreA), 0);
          const totalOppPoints = playerGames.reduce((sum, g) => sum + (g.home === viewPlayer ? g.scoreA : g.scoreH), 0);
          const avgMargin = playerGames.length > 0 ? ((totalPoints - totalOppPoints) / playerGames.length).toFixed(1) : 0;
          const highScore = playerGames.length > 0 ? Math.max(...playerGames.map(g => g.home === viewPlayer ? g.scoreH : g.scoreA)) : 0;
          const lowScore = playerGames.length > 0 ? Math.min(...playerGames.map(g => g.home === viewPlayer ? g.scoreH : g.scoreA)) : 0;
          
          // Win streak / lose streak
          const streak = getStreak(viewPlayer, games);
          
          // Blowout wins (14+)
          const blowoutWins = playerGames.filter(g => {
            const isHome = g.home === viewPlayer;
            const won = isHome ? g.scoreH > g.scoreA : g.scoreA > g.scoreH;
            const margin = Math.abs(g.scoreH - g.scoreA);
            return won && margin >= 14;
          }).length;
          
          // Clutch wins (<=7)
          const clutchWins = playerGames.filter(g => {
            const isHome = g.home === viewPlayer;
            const won = isHome ? g.scoreH > g.scoreA : g.scoreA > g.scoreH;
            const margin = Math.abs(g.scoreH - g.scoreA);
            return won && margin <= 7;
          }).length;
          
          // Most played opponents
          const oppCounts = {};
          playerGames.forEach(g => {
            const opp = g.home === viewPlayer ? g.away : g.home;
            oppCounts[opp] = (oppCounts[opp] || 0) + 1;
          });
          const topOpponents = Object.entries(oppCounts).sort((a, b) => b[1] - a[1]).slice(0, 3);
          
          // Record vs each opponent
          const oppRecords = {};
          playerGames.forEach(g => {
            const opp = g.home === viewPlayer ? g.away : g.home;
            const won = (g.home === viewPlayer && g.scoreH > g.scoreA) || (g.away === viewPlayer && g.scoreA > g.scoreH);
            if (!oppRecords[opp]) oppRecords[opp] = { wins: 0, losses: 0 };
            if (won) oppRecords[opp].wins++; else oppRecords[opp].losses++;
          });
          
          // Best/worst opponent
          const oppWinRates = Object.entries(oppRecords)
            .filter(([_, r]) => r.wins + r.losses >= 2)
            .map(([opp, r]) => ({ opp, ...r, pct: r.wins / (r.wins + r.losses) }));
          const bestOpp = oppWinRates.sort((a, b) => b.pct - a.pct)[0];
          const worstOpp = oppWinRates.sort((a, b) => a.pct - b.pct)[0];
          
          // Favorite teams
          const teamCounts = {};
          playerGames.forEach(g => {
            const team = g.home === viewPlayer ? g.teamH : g.teamA;
            const won = (g.home === viewPlayer && g.scoreH > g.scoreA) || (g.away === viewPlayer && g.scoreA > g.scoreH);
            if (!teamCounts[team]) teamCounts[team] = { games: 0, wins: 0 };
            teamCounts[team].games++;
            if (won) teamCounts[team].wins++;
          });
          const favoriteTeams = Object.entries(teamCounts)
            .filter(([_, t]) => t.games >= 2)
            .map(([team, t]) => ({ team, ...t, pct: t.wins / t.games }))
            .sort((a, b) => b.pct - a.pct || b.games - a.games)
            .slice(0, 3);
          
          return (
            <div style={{ backgroundColor: card, borderRadius: '16px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              {/* Player Selector */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ margin: 0, fontSize: '20px' }}>👤 Player Stats</h2>
                <select 
                  value={viewPlayer} 
                  onChange={e => setViewPlayer(e.target.value)}
                  style={{ padding: '10px 16px', borderRadius: '8px', border: `1px solid ${dark ? '#444' : '#ddd'}`, backgroundColor: dark ? '#333' : '#fff', color: text, fontWeight: '600', fontSize: '16px' }}
                >
                  {Object.keys(players).sort().map(name => <option key={name} value={name}>{name}</option>)}
                </select>
              </div>
              
              {/* Player Header */}
              <div style={{ textAlign: 'center', marginBottom: '24px', padding: '20px', backgroundColor: dark ? '#333' : '#f5f5f5', borderRadius: '12px' }}>
                <div style={{ fontSize: '32px', fontWeight: '800', marginBottom: '4px' }}>{viewPlayer}</div>
                <div style={{ fontSize: '18px', color: sub }}>{pStats.wins}-{pStats.losses}</div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginTop: '16px' }}>
                  <div>
                    <div style={{ fontSize: '28px', fontWeight: '700', color: '#007AFF' }}>{pStats.elo}</div>
                    <div style={{ fontSize: '12px', color: sub }}>ELO</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '28px', fontWeight: '700', color: streak.type === 'W' ? '#34C759' : '#FF3B30' }}>
                      {streak.type ? `${streak.type}${streak.count}` : '—'}
                    </div>
                    <div style={{ fontSize: '12px', color: sub }}>STREAK</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '28px', fontWeight: '700' }}>{pStats.gp > 0 ? (pStats.points / pStats.gp).toFixed(1) : '—'}</div>
                    <div style={{ fontSize: '12px', color: sub }}>PPG</div>
                  </div>
                </div>
              </div>
              
              {/* Stats Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '20px' }}>
                <div style={{ backgroundColor: dark ? '#333' : '#f5f5f5', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
                  <div style={{ fontSize: '20px', fontWeight: '700', color: '#34C759' }}>{highScore}</div>
                  <div style={{ fontSize: '11px', color: sub }}>HIGH</div>
                </div>
                <div style={{ backgroundColor: dark ? '#333' : '#f5f5f5', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
                  <div style={{ fontSize: '20px', fontWeight: '700', color: '#FF3B30' }}>{lowScore}</div>
                  <div style={{ fontSize: '11px', color: sub }}>LOW</div>
                </div>
                <div style={{ backgroundColor: dark ? '#333' : '#f5f5f5', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
                  <div style={{ fontSize: '20px', fontWeight: '700', color: parseFloat(avgMargin) >= 0 ? '#34C759' : '#FF3B30' }}>{avgMargin > 0 ? '+' : ''}{avgMargin}</div>
                  <div style={{ fontSize: '11px', color: sub }}>AVG MARGIN</div>
                </div>
                <div style={{ backgroundColor: dark ? '#333' : '#f5f5f5', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
                  <div style={{ fontSize: '20px', fontWeight: '700' }}>{blowoutWins}</div>
                  <div style={{ fontSize: '11px', color: sub }}>💥 BLOWOUTS</div>
                </div>
                <div style={{ backgroundColor: dark ? '#333' : '#f5f5f5', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
                  <div style={{ fontSize: '20px', fontWeight: '700' }}>{clutchWins}</div>
                  <div style={{ fontSize: '11px', color: sub }}>🎯 CLUTCH</div>
                </div>
                <div style={{ backgroundColor: dark ? '#333' : '#f5f5f5', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
                  <div style={{ fontSize: '20px', fontWeight: '700' }}>{p?.peakElo || 1500}</div>
                  <div style={{ fontSize: '11px', color: sub }}>PEAK ELO</div>
                </div>
              </div>
              
              {/* Opponents Section */}
              {topOpponents.length > 0 && (
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ fontSize: '12px', color: sub, marginBottom: '8px', fontWeight: '600' }}>VS OPPONENTS</div>
                  {Object.entries(oppRecords).sort((a, b) => (b[1].wins + b[1].losses) - (a[1].wins + a[1].losses)).map(([opp, record]) => (
                    <div key={opp} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', backgroundColor: dark ? '#333' : '#f9f9f9', borderRadius: '8px', marginBottom: '4px' }}>
                      <span style={{ fontWeight: '600' }}>{opp}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ color: record.wins > record.losses ? '#34C759' : record.losses > record.wins ? '#FF3B30' : sub }}>
                          {record.wins}-{record.losses}
                        </span>
                        <span style={{ fontSize: '12px', color: sub }}>
                          {((record.wins / (record.wins + record.losses)) * 100).toFixed(0)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Favorite Teams */}
              {favoriteTeams.length > 0 && (
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ fontSize: '12px', color: sub, marginBottom: '8px', fontWeight: '600' }}>TOP TEAMS</div>
                  {favoriteTeams.map(t => (
                    <div key={t.team} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', backgroundColor: dark ? '#333' : '#f9f9f9', borderRadius: '8px', marginBottom: '4px' }}>
                      <span style={{ fontWeight: '600' }}>{t.team}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ color: t.pct >= 0.5 ? '#34C759' : '#FF3B30' }}>
                          {t.wins}-{t.games - t.wins}
                        </span>
                        <span style={{ fontSize: '12px', color: sub }}>
                          {(t.pct * 100).toFixed(0)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Recent Games */}
              <div>
                <div style={{ fontSize: '12px', color: sub, marginBottom: '8px', fontWeight: '600' }}>RECENT GAMES</div>
                {recentGames.map(g => {
                  const isHome = g.home === viewPlayer;
                  const myScore = isHome ? g.scoreH : g.scoreA;
                  const oppScore = isHome ? g.scoreA : g.scoreH;
                  const opp = isHome ? g.away : g.home;
                  const won = myScore > oppScore;
                  return (
                    <div key={g.id} onClick={() => setSelGame(g)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', backgroundColor: dark ? '#333' : '#f9f9f9', borderRadius: '8px', marginBottom: '4px', cursor: 'pointer' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ color: won ? '#34C759' : '#FF3B30', fontWeight: '700' }}>{won ? 'W' : 'L'}</span>
                        <span>vs {opp}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontWeight: '600' }}>{myScore}-{oppScore}</span>
                        <span style={{ fontSize: '12px', color: sub }}>G{g.id}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })()}

        {/* RIVALS */}
        {tab === 'rivals' && (
          <div style={{ backgroundColor: card, borderRadius: '16px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <h2 style={{ margin: '0 0 16px', fontSize: '20px' }}>🔥 Rivalries</h2>
            {RIVALS.map(r => {
              const h = getH2H(r.p[0], r.p[1], games);
              if (h.games === 0) return null;
              return (
                <div key={r.name} style={{ backgroundColor: dark ? '#333' : '#f9f9f9', padding: '16px', borderRadius: '12px', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <span style={{ fontSize: '24px' }}>{r.emoji}</span>
                    <span style={{ fontWeight: '700' }}>{r.name}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', alignItems: 'center' }}>
                    <span style={{ fontWeight: '600', color: h.w1 >= h.w2 ? '#34C759' : text }}>{r.p[0]} {h.w1}</span>
                    <span style={{ color: sub }}>-</span>
                    <span style={{ fontWeight: '600', color: h.w2 >= h.w1 ? '#34C759' : text }}>{h.w2} {r.p[1]}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* STATS */}
        {tab === 'stats' && (() => {
          // Calculate dynamic stats
          const allScores = games.flatMap(g => [g.scoreH, g.scoreA]);
          const highScore = allScores.length > 0 ? Math.max(...allScores) : 0;
          const highScoreGame = games.find(g => g.scoreH === highScore || g.scoreA === highScore);
          const highScorer = highScoreGame ? (highScoreGame.scoreH === highScore ? highScoreGame.home : highScoreGame.away) : '—';
          
          const margins = games.map(g => Math.abs(g.scoreH - g.scoreA));
          const biggestMargin = margins.length > 0 ? Math.max(...margins) : 0;
          
          // Best streak
          let bestStreak = { name: '—', count: 0 };
          Object.keys(players).forEach(name => {
            const s = getStreak(name, games);
            if (s.type === 'W' && s.count > bestStreak.count) {
              bestStreak = { name, count: s.count };
            }
          });
          
          // Best win %
          let bestWinPct = { name: '—', pct: 0 };
          sorted.filter(p => p.gp >= 3).forEach(p => {
            const pct = p.wins / p.gp;
            if (pct > bestWinPct.pct) {
              bestWinPct = { name: p.name, pct };
            }
          });
          
          return (
          <div style={{ backgroundColor: card, borderRadius: '16px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <h2 style={{ margin: '0 0 16px', fontSize: '20px' }}>📊 League Stats</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
              <div style={{ backgroundColor: dark ? '#333' : '#f5f5f5', padding: '20px', borderRadius: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: '32px', fontWeight: '700' }}>{games.length}</div>
                <div style={{ color: sub }}>Total Games</div>
              </div>
              <div style={{ backgroundColor: dark ? '#333' : '#f5f5f5', padding: '20px', borderRadius: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: '32px', fontWeight: '700' }}>{Object.keys(players).length}</div>
                <div style={{ color: sub }}>Players</div>
              </div>
              <div style={{ backgroundColor: dark ? '#333' : '#f5f5f5', padding: '20px', borderRadius: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: '32px', fontWeight: '700', color: '#34C759' }}>{highScore}</div>
                <div style={{ color: sub }}>High Score ({highScorer})</div>
              </div>
              <div style={{ backgroundColor: dark ? '#333' : '#f5f5f5', padding: '20px', borderRadius: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: '32px', fontWeight: '700', color: '#FF9500' }}>{biggestMargin}</div>
                <div style={{ color: sub }}>Biggest Margin</div>
              </div>
              <div style={{ backgroundColor: dark ? '#333' : '#f5f5f5', padding: '20px', borderRadius: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: '32px', fontWeight: '700' }}>W{bestStreak.count}</div>
                <div style={{ color: sub }}>Best Streak ({bestStreak.name})</div>
              </div>
              <div style={{ backgroundColor: dark ? '#333' : '#f5f5f5', padding: '20px', borderRadius: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: '32px', fontWeight: '700' }}>{(bestWinPct.pct * 100).toFixed(0)}%</div>
                <div style={{ color: sub }}>Best Win% ({bestWinPct.name})</div>
              </div>
            </div>
            
            {/* Data Management */}
            <div style={{ marginTop: '24px', padding: '16px', backgroundColor: dark ? '#333' : '#f5f5f5', borderRadius: '12px' }}>
              <div style={{ fontSize: '12px', color: sub, marginBottom: '12px', fontWeight: '600' }}>DATA MANAGEMENT</div>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <button 
                  onClick={() => {
                    if (confirm('Reset ALL data to defaults? This cannot be undone!')) {
                      localStorage.removeItem('quadcfb-games-v2');
                      localStorage.removeItem('quadcfb-players-v2');
                      setGames(initialGames);
                      setPlayers(initialPlayers);
                    }
                  }}
                  style={{ padding: '10px 16px', backgroundColor: '#FF3B30', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}
                >
                  🗑️ Reset to Defaults
                </button>
                <div style={{ fontSize: '12px', color: sub, display: 'flex', alignItems: 'center' }}>
                  ✅ Data saves automatically to your browser
                </div>
              </div>
            </div>
          </div>
          );
        })()}
      </div>

      {/* Game Detail Modal */}
      {selGame && (() => {
        // Calculate Elo state BEFORE this game
        const gamesBeforeThis = games.filter(g => g.id < selGame.id);
        const elosBefore = {};
        Object.keys(initialPlayers).forEach(p => elosBefore[p] = 1500);
        
        gamesBeforeThis.forEach(g => {
          const homeWon = g.scoreH > g.scoreA;
          const winner = homeWon ? g.home : g.away;
          const loser = homeWon ? g.away : g.home;
          const margin = Math.abs(g.scoreH - g.scoreA);
          const K = 32;
          const expected = 1 / (1 + Math.pow(10, (elosBefore[loser] - elosBefore[winner]) / 400));
          const mov = Math.max(0.5, Math.min(2.0, Math.log(margin + 1) * 0.8));
          const gain = K * (1 - expected) * mov;
          elosBefore[winner] = (elosBefore[winner] || 1500) + gain;
          elosBefore[loser] = (elosBefore[loser] || 1500) - gain * 0.95;
        });
        
        const homeEloBefore = Math.round(elosBefore[selGame.home] || 1500);
        const awayEloBefore = Math.round(elosBefore[selGame.away] || 1500);
        
        // Calculate what the prediction WOULD have been
        const preGamePred = getPrediction(selGame.home, selGame.away, selGame.teamH, selGame.teamA, 
          { [selGame.home]: { elo: homeEloBefore }, [selGame.away]: { elo: awayEloBefore } });
        
        // Calculate Elo changes from this game
        const homeWon = selGame.scoreH > selGame.scoreA;
        const winner = homeWon ? selGame.home : selGame.away;
        const loser = homeWon ? selGame.away : selGame.home;
        const winnerEloBefore = homeWon ? homeEloBefore : awayEloBefore;
        const loserEloBefore = homeWon ? awayEloBefore : homeEloBefore;
        const margin = Math.abs(selGame.scoreH - selGame.scoreA);
        const K = 32;
        const expected = 1 / (1 + Math.pow(10, (loserEloBefore - winnerEloBefore) / 400));
        const mov = Math.max(0.5, Math.min(2.0, Math.log(margin + 1) * 0.8));
        const eloGain = Math.round(K * (1 - expected) * mov);
        const eloLoss = Math.round(eloGain * 0.95);
        
        const isUpset = (preGamePred.fav === selGame.home && selGame.scoreA > selGame.scoreH) ||
                        (preGamePred.fav === selGame.away && selGame.scoreH > selGame.scoreA);
        const totalPoints = selGame.scoreH + selGame.scoreA;
        const isBlowout = margin >= 14;
        const isClutch = margin <= 7;
        
        return (
          <div onClick={() => setSelGame(null)} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', zIndex: 1000, overflowY: 'auto' }}>
            <div onClick={e => e.stopPropagation()} style={{ backgroundColor: card, borderRadius: '16px', padding: '24px', maxWidth: '450px', width: '100%', maxHeight: '90vh', overflowY: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ margin: 0 }}>Game {selGame.id} Details</h3>
                <button onClick={() => setSelGame(null)} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: text }}>×</button>
              </div>
              
              {/* Upset Alert */}
              {isUpset && (
                <div style={{ backgroundColor: '#FF3B3020', border: '1px solid #FF3B30', borderRadius: '8px', padding: '10px', marginBottom: '16px', textAlign: 'center' }}>
                  <span style={{ fontSize: '16px' }}>😱 UPSET ALERT!</span>
                </div>
              )}
              
              {/* Final Score */}
              <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <div style={{ fontSize: '12px', color: sub, marginBottom: '8px' }}>FINAL SCORE • Session {selGame.session}</div>
                <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: '700', fontSize: '18px', color: homeWon ? '#34C759' : text }}>{selGame.home} {homeWon && '✓'}</div>
                    <div style={{ fontSize: '12px', color: sub }}>{selGame.teamH}</div>
                    <div style={{ fontSize: '36px', fontWeight: '800', color: homeWon ? '#34C759' : sub }}>{selGame.scoreH}</div>
                  </div>
                  <div style={{ color: sub }}>—</div>
                  <div>
                    <div style={{ fontWeight: '700', fontSize: '18px', color: !homeWon ? '#34C759' : text }}>{selGame.away} {!homeWon && '✓'}</div>
                    <div style={{ fontSize: '12px', color: sub }}>{selGame.teamA}</div>
                    <div style={{ fontSize: '36px', fontWeight: '800', color: !homeWon ? '#34C759' : sub }}>{selGame.scoreA}</div>
                  </div>
                </div>
              </div>
              
              {/* Pre-Game Lines */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '12px', color: sub, marginBottom: '8px', fontWeight: '600' }}>PRE-GAME LINES</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                  <div style={{ backgroundColor: dark ? '#333' : '#f5f5f5', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
                    <div style={{ fontSize: '10px', color: sub }}>SPREAD</div>
                    <div style={{ fontWeight: '700', fontSize: '14px' }}>{preGamePred.fav} {preGamePred.spread}</div>
                  </div>
                  <div style={{ backgroundColor: dark ? '#333' : '#f5f5f5', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
                    <div style={{ fontSize: '10px', color: sub }}>MONEYLINES</div>
                    <div style={{ fontSize: '12px' }}>{selGame.home}: {preGamePred.ml1 > 0 ? '+' : ''}{preGamePred.ml1}</div>
                    <div style={{ fontSize: '12px' }}>{selGame.away}: {preGamePred.ml2 > 0 ? '+' : ''}{preGamePred.ml2}</div>
                  </div>
                  <div style={{ backgroundColor: dark ? '#333' : '#f5f5f5', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
                    <div style={{ fontSize: '10px', color: sub }}>WIN PROB</div>
                    <div style={{ fontSize: '12px' }}>{selGame.home}: {preGamePred.prob1}%</div>
                    <div style={{ fontSize: '12px' }}>{selGame.away}: {preGamePred.prob2}%</div>
                  </div>
                </div>
              </div>
              
              {/* Elo Changes */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '12px', color: sub, marginBottom: '8px', fontWeight: '600' }}>ELO CHANGES</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  <div style={{ backgroundColor: homeWon ? '#34C75915' : '#FF3B3015', padding: '12px', borderRadius: '8px', textAlign: 'center', border: `1px solid ${homeWon ? '#34C759' : '#FF3B30'}` }}>
                    <div style={{ fontWeight: '600' }}>{selGame.home}</div>
                    <div style={{ fontSize: '12px', color: sub }}>{homeEloBefore} → {homeEloBefore + (homeWon ? eloGain : -eloLoss)}</div>
                    <div style={{ fontWeight: '700', color: homeWon ? '#34C759' : '#FF3B30' }}>
                      {homeWon ? '+' : ''}{homeWon ? eloGain : -eloLoss}
                    </div>
                  </div>
                  <div style={{ backgroundColor: !homeWon ? '#34C75915' : '#FF3B3015', padding: '12px', borderRadius: '8px', textAlign: 'center', border: `1px solid ${!homeWon ? '#34C759' : '#FF3B30'}` }}>
                    <div style={{ fontWeight: '600' }}>{selGame.away}</div>
                    <div style={{ fontSize: '12px', color: sub }}>{awayEloBefore} → {awayEloBefore + (!homeWon ? eloGain : -eloLoss)}</div>
                    <div style={{ fontWeight: '700', color: !homeWon ? '#34C759' : '#FF3B30' }}>
                      {!homeWon ? '+' : ''}{!homeWon ? eloGain : -eloLoss}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Game Stats */}
              <div>
                <div style={{ fontSize: '12px', color: sub, marginBottom: '8px', fontWeight: '600' }}>GAME STATS</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                  <div style={{ backgroundColor: dark ? '#333' : '#f5f5f5', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
                    <div style={{ fontSize: '10px', color: sub }}>MARGIN</div>
                    <div style={{ fontWeight: '700', fontSize: '18px' }}>{margin}</div>
                  </div>
                  <div style={{ backgroundColor: dark ? '#333' : '#f5f5f5', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
                    <div style={{ fontSize: '10px', color: sub }}>TOTAL PTS</div>
                    <div style={{ fontWeight: '700', fontSize: '18px' }}>{totalPoints}</div>
                  </div>
                  <div style={{ backgroundColor: dark ? '#333' : '#f5f5f5', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
                    <div style={{ fontSize: '10px', color: sub }}>TYPE</div>
                    <div style={{ fontWeight: '700', fontSize: '14px' }}>{isBlowout ? '💥 Blowout' : isClutch ? '🎯 Clutch' : '—'}</div>
                  </div>
                </div>
              </div>
              
              {/* Edit/Delete Buttons */}
              <div style={{ marginTop: '20px', display: 'flex', gap: '12px' }}>
                <button 
                  onClick={() => handleStartEdit(selGame)}
                  style={{ flex: 1, padding: '12px', backgroundColor: '#007AFF', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: '600', cursor: 'pointer' }}
                >
                  ✏️ Edit Game
                </button>
                <button 
                  onClick={() => handleDeleteGame(selGame.id)}
                  style={{ padding: '12px 16px', backgroundColor: '#FF3B30', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: '600', cursor: 'pointer' }}
                >
                  🗑️
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Edit Game Modal */}
      {editGame && (
        <div onClick={() => setEditGame(null)} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', zIndex: 1000 }}>
          <div onClick={e => e.stopPropagation()} style={{ backgroundColor: card, borderRadius: '16px', padding: '24px', maxWidth: '450px', width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h3 style={{ margin: 0 }}>✏️ Edit Game {editGame.id}</h3>
              <button onClick={() => setEditGame(null)} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: text }}>×</button>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '16px', alignItems: 'start' }}>
              {/* Home Player */}
              <div>
                <label style={{ fontSize: '12px', color: sub, display: 'block', marginBottom: '4px' }}>Home: {editGame.home}</label>
                <select value={editTeamH} onChange={e => setEditTeamH(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '8px', border: `1px solid ${dark ? '#444' : '#ddd'}`, backgroundColor: dark ? '#333' : '#fff', color: text, fontSize: '12px', marginBottom: '8px' }}>
                  {teams.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                <input 
                  type="number" 
                  placeholder="Score" 
                  value={editScoreH} 
                  onChange={e => setEditScoreH(e.target.value)}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: `1px solid ${dark ? '#444' : '#ddd'}`, backgroundColor: dark ? '#333' : '#fff', color: text, fontSize: '18px', fontWeight: '700', textAlign: 'center', boxSizing: 'border-box' }}
                />
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', paddingTop: '30px', fontWeight: '700', color: sub }}>VS</div>
              
              {/* Away Player */}
              <div>
                <label style={{ fontSize: '12px', color: sub, display: 'block', marginBottom: '4px' }}>Away: {editGame.away}</label>
                <select value={editTeamA} onChange={e => setEditTeamA(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '8px', border: `1px solid ${dark ? '#444' : '#ddd'}`, backgroundColor: dark ? '#333' : '#fff', color: text, fontSize: '12px', marginBottom: '8px' }}>
                  {teams.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                <input 
                  type="number" 
                  placeholder="Score" 
                  value={editScoreA} 
                  onChange={e => setEditScoreA(e.target.value)}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: `1px solid ${dark ? '#444' : '#ddd'}`, backgroundColor: dark ? '#333' : '#fff', color: text, fontSize: '18px', fontWeight: '700', textAlign: 'center', boxSizing: 'border-box' }}
                />
              </div>
            </div>
            
            <button 
              onClick={handleSaveEdit}
              disabled={!editScoreH || !editScoreA}
              style={{ 
                width: '100%', 
                padding: '14px', 
                marginTop: '20px', 
                backgroundColor: (!editScoreH || !editScoreA) ? '#ccc' : '#34C759', 
                color: '#fff', 
                border: 'none', 
                borderRadius: '10px', 
                fontWeight: '700', 
                fontSize: '16px', 
                cursor: (!editScoreH || !editScoreA) ? 'not-allowed' : 'pointer' 
              }}
            >
              Save Changes
            </button>
          </div>
        </div>
      )}

      {/* New Game Modal */}
      {showNewGame && (
        <div onClick={() => setShowNewGame(false)} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', zIndex: 1000 }}>
          <div onClick={e => e.stopPropagation()} style={{ backgroundColor: card, borderRadius: '16px', padding: '24px', maxWidth: '450px', width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h3 style={{ margin: 0 }}>🏈 New Game</h3>
              <button onClick={() => setShowNewGame(false)} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: text }}>×</button>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '16px', alignItems: 'start' }}>
              {/* Home Player */}
              <div>
                <label style={{ fontSize: '12px', color: sub, display: 'block', marginBottom: '4px' }}>Home Player</label>
                <select value={newHome} onChange={e => setNewHome(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: `1px solid ${dark ? '#444' : '#ddd'}`, backgroundColor: dark ? '#333' : '#fff', color: text, marginBottom: '8px' }}>
                  {Object.keys(players).map(p => <option key={p} value={p}>{p}</option>)}
                </select>
                <select value={newTeamH} onChange={e => setNewTeamH(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '8px', border: `1px solid ${dark ? '#444' : '#ddd'}`, backgroundColor: dark ? '#333' : '#fff', color: text, fontSize: '12px', marginBottom: '8px' }}>
                  {teams.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                <input 
                  type="number" 
                  placeholder="Score" 
                  value={newScoreH} 
                  onChange={e => setNewScoreH(e.target.value)}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: `1px solid ${dark ? '#444' : '#ddd'}`, backgroundColor: dark ? '#333' : '#fff', color: text, fontSize: '18px', fontWeight: '700', textAlign: 'center', boxSizing: 'border-box' }}
                />
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', paddingTop: '30px', fontWeight: '700', color: sub }}>VS</div>
              
              {/* Away Player */}
              <div>
                <label style={{ fontSize: '12px', color: sub, display: 'block', marginBottom: '4px' }}>Away Player</label>
                <select value={newAway} onChange={e => setNewAway(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: `1px solid ${dark ? '#444' : '#ddd'}`, backgroundColor: dark ? '#333' : '#fff', color: text, marginBottom: '8px' }}>
                  {Object.keys(players).map(p => <option key={p} value={p}>{p}</option>)}
                </select>
                <select value={newTeamA} onChange={e => setNewTeamA(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '8px', border: `1px solid ${dark ? '#444' : '#ddd'}`, backgroundColor: dark ? '#333' : '#fff', color: text, fontSize: '12px', marginBottom: '8px' }}>
                  {teams.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                <input 
                  type="number" 
                  placeholder="Score" 
                  value={newScoreA} 
                  onChange={e => setNewScoreA(e.target.value)}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: `1px solid ${dark ? '#444' : '#ddd'}`, backgroundColor: dark ? '#333' : '#fff', color: text, fontSize: '18px', fontWeight: '700', textAlign: 'center', boxSizing: 'border-box' }}
                />
              </div>
            </div>
            
            <button 
              onClick={handleAddGame}
              disabled={!newScoreH || !newScoreA}
              style={{ 
                width: '100%', 
                padding: '14px', 
                marginTop: '20px', 
                backgroundColor: (!newScoreH || !newScoreA) ? '#ccc' : '#34C759', 
                color: '#fff', 
                border: 'none', 
                borderRadius: '10px', 
                fontWeight: '700', 
                fontSize: '16px', 
                cursor: (!newScoreH || !newScoreA) ? 'not-allowed' : 'pointer' 
              }}
            >
              Save Game
            </button>
          </div>
        </div>
      )}

      {/* New Player Modal */}
      {showNewPlayer && (
        <div onClick={() => setShowNewPlayer(false)} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', zIndex: 1000 }}>
          <div onClick={e => e.stopPropagation()} style={{ backgroundColor: card, borderRadius: '16px', padding: '24px', maxWidth: '350px', width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h3 style={{ margin: 0 }}>👤 Add Player</h3>
              <button onClick={() => setShowNewPlayer(false)} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: text }}>×</button>
            </div>
            
            <div>
              <label style={{ fontSize: '12px', color: sub, display: 'block', marginBottom: '4px' }}>Player Name</label>
              <input 
                type="text" 
                placeholder="Enter name..." 
                value={newPlayerName} 
                onChange={e => setNewPlayerName(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && handleAddPlayer()}
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: `1px solid ${dark ? '#444' : '#ddd'}`, backgroundColor: dark ? '#333' : '#fff', color: text, fontSize: '16px', boxSizing: 'border-box' }}
              />
              <p style={{ fontSize: '12px', color: sub, marginTop: '8px' }}>New players start with 1500 Elo</p>
            </div>
            
            <button 
              onClick={handleAddPlayer}
              disabled={!newPlayerName.trim()}
              style={{ 
                width: '100%', 
                padding: '14px', 
                marginTop: '16px', 
                backgroundColor: !newPlayerName.trim() ? '#ccc' : '#34C759', 
                color: '#fff', 
                border: 'none', 
                borderRadius: '10px', 
                fontWeight: '700', 
                fontSize: '16px', 
                cursor: !newPlayerName.trim() ? 'not-allowed' : 'pointer' 
              }}
            >
              Add Player
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

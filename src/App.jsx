import React, { useState, useEffect } from 'react';

// Default data - only used if no saved data exists
const defaultPlayers = {
  SHAW: { elo: 1763, peakElo: 1763 },
  AADI: { elo: 1639, peakElo: 1639 },
  BEN: { elo: 1620, peakElo: 1627 },
  YEAGER: { elo: 1565, peakElo: 1606 },
  HENRY: { elo: 1499, peakElo: 1576 },
  NICK: { elo: 1487, peakElo: 1500 },
  SEAMUS: { elo: 1452, peakElo: 1500 },
  RYAN: { elo: 1451, peakElo: 1500 },
  ELI: { elo: 1435, peakElo: 1562 },
  ASHER: { elo: 1368, peakElo: 1521 },
};

const defaultGames = [
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
  { id: 38, home: 'ELI', away: 'YEAGER', teamH: 'Oklahoma', teamA: 'Miami', scoreH: 23, scoreA: 20, session: 4 },
  { id: 39, home: 'ELI', away: 'BEN', teamH: 'USC', teamA: 'Texas A&M', scoreH: 7, scoreA: 28, session: 4, date: '2025-01-16' },
  { id: 40, home: 'HENRY', away: 'ELI', teamH: 'Georgia', teamA: 'Miami', scoreH: 0, scoreA: 21, session: 4, date: '2025-01-16' },
  { id: 41, home: 'YEAGER', away: 'ELI', teamH: 'USC', teamA: 'Texas', scoreH: 10, scoreA: 7, session: 4, date: '2025-01-16' },
];

const teamElos = {
  'Alabama': 1857, 'Arkansas': 1620, 'Auburn': 1680, 'Florida': 1700, 'Georgia': 2057,
  'Kentucky': 1580, 'LSU': 1690, 'Mississippi State': 1550, 'Missouri': 1640, 'Oklahoma': 1720,
  'Ole Miss': 2009, 'South Carolina': 1560, 'Tennessee': 1780, 'Texas': 1920, 'Texas A&M': 1650, 'Vanderbilt': 1400,
  'Illinois': 1520, 'Indiana': 2354, 'Iowa': 1937, 'Maryland': 1480, 'Michigan': 1786,
  'Michigan State': 1540, 'Minnesota': 1560, 'Nebraska': 1580, 'Northwestern': 1450, 'Ohio State': 2138,
  'Oregon': 2071, 'Penn State': 1954, 'Purdue': 1420, 'Rutgers': 1440, 'UCLA': 1550,
  'USC': 1750, 'Washington': 1680, 'Wisconsin': 1620,
  'Arizona': 1350, 'Arizona State': 1340, 'Baylor': 1560, 'BYU': 1620, 'UCF': 1580,
  'Cincinnati': 1540, 'Colorado': 1600, 'Houston': 1480, 'Iowa State': 1640, 'Kansas': 1520,
  'Kansas State': 1660, 'Oklahoma State': 1580, 'TCU': 1600, 'Texas Tech': 2056, 'Utah': 1976, 'West Virginia': 1500,
  'Boston College': 1420, 'California': 1480, 'Clemson': 1680, 'Duke': 1560, 'Florida State': 1550,
  'Georgia Tech': 1380, 'Louisville': 1600, 'Miami': 2006, 'NC State': 1540, 'North Carolina': 1580,
  'Pittsburgh': 1560, 'SMU': 1620, 'Stanford': 1450, 'Syracuse': 1520, 'Virginia': 1460,
  'Virginia Tech': 1500, 'Wake Forest': 1480,
  'Army': 1589, 'Navy': 1575, 'Notre Dame': 1850, 'Memphis': 1560, 'Tulane': 1580,
  'Boise State': 1680, 'Air Force': 1520, 'UNLV': 1580, 'San Diego State': 1500,
  'Appalachian State': 1540, 'Coastal Carolina': 1460, 'James Madison': 1580, 'Liberty': 1540,
  'Marshall': 1460, 'Georgia Southern': 1420, 'Troy': 1460,
};

const RIVALS = [
  { p: ['SHAW', 'AADI'], name: 'The Throne', emoji: '👑' },
  { p: ['SHAW', 'YEAGER'], name: 'Beatdown Bros', emoji: '💀' },
  { p: ['ELI', 'ASHER'], name: 'Brother Battle', emoji: '👊' },
  { p: ['BEN', 'YEAGER'], name: 'The Grind', emoji: '⚔️' },
];

// Helper functions
const getStreak = (name, games) => {
  const pg = games.filter(g => g.home === name || g.away === name);
  if (!pg.length) return { type: null, count: 0 };
  let streak = 0, type = null;
  for (let i = pg.length - 1; i >= 0; i--) {
    const won = (pg[i].home === name && pg[i].scoreH > pg[i].scoreA) || (pg[i].away === name && pg[i].scoreA > pg[i].scoreH);
    if (type === null) { type = won ? 'W' : 'L'; streak = 1; }
    else if ((type === 'W' && won) || (type === 'L' && !won)) streak++;
    else break;
  }
  return { type, count: streak };
};

const getPrediction = (p1, p2, t1, t2, players) => {
  const p1Elo = players[p1]?.elo || 1500;
  const p2Elo = players[p2]?.elo || 1500;
  const t1Elo = teamElos[t1] || 1500;
  const t2Elo = teamElos[t2] || 1500;
  const combo1 = p1Elo * 0.7 + t1Elo * 0.3;
  const combo2 = p2Elo * 0.7 + t2Elo * 0.3;
  const expected1 = 1 / (1 + Math.pow(10, (combo2 - combo1) / 400));
  const prob1 = Math.round(expected1 * 100);
  const prob2 = 100 - prob1;
  const diff = combo1 - combo2;
  const absDiff = Math.abs(diff);
  const spreadNum = Math.floor(absDiff / 25) + 0.5;
  const fav = diff > 0 ? p1 : p2;
  const spread = `-${spreadNum}`;
  const ml1 = prob1 > 50 ? Math.round(-100 * prob1 / (100 - prob1)) : Math.round(100 * (100 - prob1) / prob1);
  const ml2 = prob2 > 50 ? Math.round(-100 * prob2 / (100 - prob2)) : Math.round(100 * (100 - prob2) / prob2);
  return { prob1, prob2, spread, fav, ml1, ml2 };
};

const getH2H = (p1, p2, games) => {
  const matches = games.filter(g => (g.home === p1 && g.away === p2) || (g.home === p2 && g.away === p1));
  let w1 = 0, w2 = 0;
  matches.forEach(g => {
    if ((g.home === p1 && g.scoreH > g.scoreA) || (g.away === p1 && g.scoreA > g.scoreH)) w1++;
    else w2++;
  });
  return { games: matches.length, w1, w2, details: matches };
};

export default function App() {
  const [players, setPlayers] = useState(() => {
    try {
      const saved = localStorage.getItem('quadcfb-players');
      return saved ? JSON.parse(saved) : defaultPlayers;
    } catch { return defaultPlayers; }
  });
  
  const [games, setGames] = useState(() => {
    try {
      const saved = localStorage.getItem('quadcfb-games');
      return saved ? JSON.parse(saved) : defaultGames;
    } catch { return defaultGames; }
  });
  
  const [dark, setDark] = useState(() => {
    try {
      const saved = localStorage.getItem('quadcfb-dark');
      return saved ? JSON.parse(saved) : false;
    } catch { return false; }
  });

  const [tab, setTab] = useState('leaderboard');
  const [selGame, setSelGame] = useState(null);
  const [showNewGame, setShowNewGame] = useState(false);
  const [h2hP1, setH2hP1] = useState('SHAW');
  const [h2hP2, setH2hP2] = useState('AADI');
  const [predP1, setPredP1] = useState('SHAW');
  const [predP2, setPredP2] = useState('AADI');
  const [predT1, setPredT1] = useState('Georgia');
  const [predT2, setPredT2] = useState('Ohio State');
  const [saveStatus, setSaveStatus] = useState('');
  
  const [newHome, setNewHome] = useState('SHAW');
  const [newAway, setNewAway] = useState('AADI');
  const [newTeamH, setNewTeamH] = useState('Georgia');
  const [newTeamA, setNewTeamA] = useState('Ohio State');
  const [newScoreH, setNewScoreH] = useState('');
  const [newScoreA, setNewScoreA] = useState('');
  
  const [showNewPlayer, setShowNewPlayer] = useState(false);
  const [newPlayerName, setNewPlayerName] = useState('');
  
  const [editGame, setEditGame] = useState(null);
  const [editScoreH, setEditScoreH] = useState('');
  const [editScoreA, setEditScoreA] = useState('');
  const [editTeamH, setEditTeamH] = useState('');
  const [editTeamA, setEditTeamA] = useState('');
  
  const [gameSort, setGameSort] = useState('newest');
  const [viewPlayer, setViewPlayer] = useState('SHAW');

  // Auto-save
  useEffect(() => {
    try {
      localStorage.setItem('quadcfb-players', JSON.stringify(players));
      localStorage.setItem('quadcfb-games', JSON.stringify(games));
      localStorage.setItem('quadcfb-dark', JSON.stringify(dark));
      setSaveStatus('✓ Saved');
      const timer = setTimeout(() => setSaveStatus(''), 1500);
      return () => clearTimeout(timer);
    } catch (e) {
      console.error('Save failed:', e);
    }
  }, [players, games, dark]);

  const calculatePlayerStats = (playerName) => {
    const playerGames = games.filter(g => g.home === playerName || g.away === playerName);
    let wins = 0, losses = 0, points = 0;
    playerGames.forEach(g => {
      const isHome = g.home === playerName;
      const myScore = isHome ? g.scoreH : g.scoreA;
      const oppScore = isHome ? g.scoreA : g.scoreH;
      points += myScore;
      if (myScore > oppScore) wins++; else losses++;
    });
    return { gp: playerGames.length, wins, losses, points, elo: players[playerName]?.elo || 1500, peakElo: players[playerName]?.peakElo || 1500 };
  };

  const sorted = Object.keys(players).map(name => ({ name, ...calculatePlayerStats(name), streak: getStreak(name, games) })).sort((a, b) => b.elo - a.elo);
  const teams = Object.keys(teamElos).sort((a,b) => teamElos[b] - teamElos[a]);
  const prediction = getPrediction(predP1, predP2, predT1, predT2, players);
  const h2h = getH2H(h2hP1, h2hP2, games);
  
  const sortedGames = [...games].sort((a, b) => {
    switch (gameSort) {
      case 'oldest': return a.id - b.id;
      case 'margin': return Math.abs(b.scoreH - b.scoreA) - Math.abs(a.scoreH - a.scoreA);
      case 'points': return (b.scoreH + b.scoreA) - (a.scoreH + a.scoreA);
      case 'date': 
        if (a.date && b.date) return b.date.localeCompare(a.date);
        if (a.date && !b.date) return -1;
        if (!a.date && b.date) return 1;
        return b.id - a.id;
      default: return b.id - a.id;
    }
  });
  
  const formatDate = (dateStr) => {
    if (!dateStr) return 'Pre-Tracked';
    const date = new Date(dateStr + 'T00:00:00');
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const gameDate = new Date(date); gameDate.setHours(0, 0, 0, 0);
    if (gameDate.getTime() === today.getTime()) return 'Today';
    const yesterday = new Date(today); yesterday.setDate(yesterday.getDate() - 1);
    if (gameDate.getTime() === yesterday.getTime()) return 'Yesterday';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };
  
  const recalculateAllElos = (gamesList) => {
    const newElos = {};
    Object.keys(players).forEach(p => { newElos[p] = { elo: 1500, peakElo: 1500 }; });
    gamesList.forEach(g => {
      if (!newElos[g.home]) newElos[g.home] = { elo: 1500, peakElo: 1500 };
      if (!newElos[g.away]) newElos[g.away] = { elo: 1500, peakElo: 1500 };
      const homeWon = g.scoreH > g.scoreA;
      const winner = homeWon ? g.home : g.away;
      const loser = homeWon ? g.away : g.home;
      const margin = Math.abs(g.scoreH - g.scoreA);
      const K = 32;
      const winnerElo = newElos[winner].elo;
      const loserElo = newElos[loser].elo;
      const expected = 1 / (1 + Math.pow(10, (loserElo - winnerElo) / 400));
      const mov = Math.max(0.5, Math.min(2.0, Math.log(margin + 1) * 0.8));
      const eloGain = Math.round(K * (1 - expected) * mov);
      const eloLoss = Math.round(eloGain * 0.95);
      newElos[winner].elo = winnerElo + eloGain;
      newElos[winner].peakElo = Math.max(newElos[winner].peakElo, winnerElo + eloGain);
      newElos[loser].elo = loserElo - eloLoss;
    });
    return newElos;
  };
  
  const handleAddGame = () => {
    if (!newScoreH || !newScoreA) return;
    const today = new Date().toISOString().split('T')[0];
    const newGame = { id: games.length + 1, home: newHome, away: newAway, teamH: newTeamH, teamA: newTeamA, scoreH: parseInt(newScoreH), scoreA: parseInt(newScoreA), session: 5, date: today };
    const newGamesList = [...games, newGame];
    const newElos = recalculateAllElos(newGamesList);
    setGames(newGamesList);
    setPlayers(prev => {
      const updated = { ...prev };
      Object.keys(newElos).forEach(p => { updated[p] = { ...updated[p], ...newElos[p] }; });
      return updated;
    });
    setShowNewGame(false);
    setNewScoreH('');
    setNewScoreA('');
  };
  
  const handleAddPlayer = () => {
    if (!newPlayerName.trim()) return;
    const name = newPlayerName.trim().toUpperCase();
    if (players[name]) { alert('Player already exists!'); return; }
    setPlayers(prev => ({ ...prev, [name]: { elo: 1500, peakElo: 1500 } }));
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
    const newGamesList = games.map(g => g.id === editGame.id ? { ...g, scoreH: parseInt(editScoreH), scoreA: parseInt(editScoreA), teamH: editTeamH, teamA: editTeamA } : g);
    const newElos = recalculateAllElos(newGamesList);
    setGames(newGamesList);
    setPlayers(prev => {
      const updated = { ...prev };
      Object.keys(newElos).forEach(p => { updated[p] = { ...updated[p], ...newElos[p] }; });
      return updated;
    });
    setEditGame(null);
  };
  
  const handleDeleteGame = (gameId) => {
    if (!confirm('Delete this game?')) return;
    const newGamesList = games.filter(g => g.id !== gameId);
    const newElos = recalculateAllElos(newGamesList);
    setGames(newGamesList);
    setPlayers(prev => {
      const updated = { ...prev };
      Object.keys(newElos).forEach(p => { updated[p] = { ...updated[p], ...newElos[p] }; });
      return updated;
    });
    setEditGame(null);
    setSelGame(null);
  };
  
  const handleResetData = () => {
    if (confirm('Reset ALL data?')) {
      localStorage.removeItem('quadcfb-players');
      localStorage.removeItem('quadcfb-games');
      setGames(defaultGames);
      setPlayers(defaultPlayers);
    }
  };

  const bracket = (() => {
    const eligible = sorted.filter(p => p.gp >= 1).slice(0, 8);
    if (eligible.length < 4) return null;
    const bracketSize = eligible.length >= 8 ? 8 : 4;
    const seeds = eligible.slice(0, bracketSize);
    const round1 = bracketSize === 4 ? [
      { p1: seeds[0], p2: seeds[3], seed1: 1, seed2: 4 },
      { p1: seeds[1], p2: seeds[2], seed1: 2, seed2: 3 },
    ] : [
      { p1: seeds[0], p2: seeds[7], seed1: 1, seed2: 8 },
      { p1: seeds[3], p2: seeds[4], seed1: 4, seed2: 5 },
      { p1: seeds[1], p2: seeds[6], seed1: 2, seed2: 7 },
      { p1: seeds[2], p2: seeds[5], seed1: 3, seed2: 6 },
    ];
    return { bracketSize, seeds, round1 };
  })();

  const bg = dark ? '#1a1a1a' : '#f5f5f5';
  const card = dark ? '#2a2a2a' : '#ffffff';
  const text = dark ? '#ffffff' : '#1a1a1a';
  const sub = dark ? '#888' : '#666';

  return (
    <div style={{ minHeight: '100vh', backgroundColor: bg, color: text, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #1d1d1f 0%, #2d2d2d 100%)', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ margin: 0, color: '#fff', fontSize: '24px' }}>🏈 Quad CFB</h1>
          <p style={{ margin: '4px 0 0', color: '#888', fontSize: '14px' }}>
            Ultimate League Tracker
            {saveStatus && <span style={{ marginLeft: '8px', color: '#34C759' }}>{saveStatus}</span>}
          </p>
        </div>
        <button onClick={() => setDark(!dark)} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}>
          {dark ? '☀️' : '🌙'}
        </button>
      </div>

      {/* Nav */}
      <div style={{ display: 'flex', gap: '8px', padding: '12px', backgroundColor: dark ? '#252525' : '#e5e5e5', overflowX: 'auto' }}>
        {[['leaderboard', '🏆'], ['games', '🎮'], ['predict', '🎯'], ['playoff', '🏅'], ['h2h', '⚔️'], ['players', '👤'], ['stats', '📊']].map(([t, icon]) => (
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
              <button onClick={() => setShowNewPlayer(true)} style={{ padding: '10px 20px', backgroundColor: '#34C759', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: '600', cursor: 'pointer' }}>+ Add Player</button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', padding: '8px 12px', borderBottom: `1px solid ${dark ? '#444' : '#e0e0e0'}`, marginBottom: '8px' }}>
              <span style={{ width: '30px', fontSize: '11px', color: sub, fontWeight: '600' }}>#</span>
              <span style={{ flex: 1, fontSize: '11px', color: sub, fontWeight: '600' }}>PLAYER</span>
              <span style={{ width: '60px', textAlign: 'center', fontSize: '11px', color: sub, fontWeight: '600' }}>RECORD</span>
              <span style={{ width: '45px', textAlign: 'center', fontSize: '11px', color: sub, fontWeight: '600' }}>STRK</span>
              <span style={{ width: '45px', textAlign: 'center', fontSize: '11px', color: sub, fontWeight: '600' }}>PPG</span>
              <span style={{ width: '50px', textAlign: 'right', fontSize: '11px', color: sub, fontWeight: '600' }}>ELO</span>
            </div>
            {sorted.map((p, i) => (
              <div key={p.name} style={{ display: 'flex', alignItems: 'center', padding: '12px', backgroundColor: i % 2 === 0 ? (dark ? '#333' : '#f9f9f9') : 'transparent', borderRadius: '8px', marginBottom: '4px' }}>
                <span style={{ width: '30px', fontWeight: '700', color: sub }}>{i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : i + 1}</span>
                <span style={{ flex: 1, fontWeight: '700' }}>{p.name}</span>
                <span style={{ width: '60px', textAlign: 'center', color: sub }}>{p.wins}-{p.losses}</span>
                <span style={{ width: '45px', textAlign: 'center', color: p.streak.type === 'W' ? '#34C759' : '#FF3B30', fontWeight: '600' }}>{p.streak.type ? `${p.streak.type}${p.streak.count}` : '—'}</span>
                <span style={{ width: '45px', textAlign: 'center', color: sub }}>{p.gp > 0 ? (p.points / p.gp).toFixed(1) : '—'}</span>
                <span style={{ width: '50px', textAlign: 'right', fontWeight: '700' }}>{p.elo}</span>
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
                <select value={gameSort} onChange={e => setGameSort(e.target.value)} style={{ padding: '8px 12px', borderRadius: '8px', border: `1px solid ${dark ? '#444' : '#ddd'}`, backgroundColor: dark ? '#333' : '#fff', color: text, fontSize: '14px' }}>
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="date">By Date</option>
                  <option value="margin">Biggest Margin</option>
                  <option value="points">Highest Scoring</option>
                </select>
                <button onClick={() => setShowNewGame(true)} style={{ padding: '10px 20px', backgroundColor: '#007AFF', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: '600', cursor: 'pointer' }}>+ Add Game</button>
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
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: homeWon ? '700' : '400', color: homeWon ? '#34C759' : text }}>{g.home} ({g.teamH}) {homeWon && '✓'}</div>
                      <div style={{ fontWeight: !homeWon ? '700' : '400', color: !homeWon ? '#34C759' : text }}>{g.away} ({g.teamA}) {!homeWon && '✓'}</div>
                    </div>
                    <div style={{ fontSize: '24px', fontWeight: '700' }}>{g.scoreH} - {g.scoreA}</div>
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
            <div style={{ height: '24px', borderRadius: '12px', overflow: 'hidden', display: 'flex' }}>
              <div style={{ width: `${prediction.prob1}%`, backgroundColor: '#34C759', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '12px', fontWeight: '600' }}>{prediction.prob1}%</div>
              <div style={{ width: `${prediction.prob2}%`, backgroundColor: '#FF9500', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '12px', fontWeight: '600' }}>{prediction.prob2}%</div>
            </div>
          </div>
        )}

        {/* PLAYOFF */}
        {tab === 'playoff' && (
          <div style={{ backgroundColor: card, borderRadius: '16px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <h2 style={{ margin: '0 0 4px', fontSize: '24px' }}>🏆 Playoff Bracket</h2>
              <p style={{ margin: 0, color: sub, fontSize: '14px' }}>Based on current Elo rankings</p>
            </div>
            {!bracket ? (
              <div style={{ textAlign: 'center', padding: '40px', color: sub }}>
                <div style={{ fontSize: '48px' }}>🏈</div>
                <p>Need at least 4 players with games</p>
              </div>
            ) : (
              <>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '24px' }}>
                  {bracket.seeds.slice(0, 4).map((p, i) => (
                    <div key={p.name} style={{ padding: '12px 8px', background: i === 0 ? 'linear-gradient(135deg, #FFD700, #FFA500)' : i === 1 ? 'linear-gradient(135deg, #C0C0C0, #A0A0A0)' : i === 2 ? 'linear-gradient(135deg, #CD7F32, #8B4513)' : (dark ? '#333' : '#f0f0f0'), borderRadius: '12px', textAlign: 'center', color: i < 3 ? '#000' : text }}>
                      <div style={{ fontSize: '11px', fontWeight: '600', opacity: 0.8 }}>#{i + 1} SEED</div>
                      <div style={{ fontSize: '16px', fontWeight: '800', marginTop: '4px' }}>{p.name}</div>
                      <div style={{ fontSize: '12px', opacity: 0.8 }}>{p.elo} Elo</div>
                    </div>
                  ))}
                </div>
                <div style={{ background: 'linear-gradient(135deg, #FFD700, #FFA500)', borderRadius: '12px', padding: '20px', textAlign: 'center' }}>
                  <div style={{ fontSize: '12px', color: '#00000080', marginBottom: '8px' }}>🏆 PROJECTED CHAMPIONSHIP</div>
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
                    <div><div style={{ fontSize: '20px', fontWeight: '800', color: '#000' }}>{bracket.seeds[0].name}</div></div>
                    <div style={{ fontSize: '18px', fontWeight: '700', color: '#00000060' }}>VS</div>
                    <div><div style={{ fontSize: '20px', fontWeight: '800', color: '#000' }}>{bracket.seeds[1].name}</div></div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* H2H */}
        {tab === 'h2h' && (
          <div style={{ backgroundColor: card, borderRadius: '16px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <h2 style={{ margin: '0 0 16px', fontSize: '20px' }}>⚔️ Head to Head</h2>
            <div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
              <select value={h2hP1} onChange={e => setH2hP1(e.target.value)} style={{ flex: 1, padding: '12px', borderRadius: '8px', border: `1px solid ${dark ? '#444' : '#ddd'}`, backgroundColor: dark ? '#333' : '#fff', color: text, fontWeight: '600' }}>
                {Object.keys(players).map(p => <option key={p} value={p}>{p}</option>)}
              </select>
              <span style={{ display: 'flex', alignItems: 'center', fontWeight: '700', color: sub }}>vs</span>
              <select value={h2hP2} onChange={e => setH2hP2(e.target.value)} style={{ flex: 1, padding: '12px', borderRadius: '8px', border: `1px solid ${dark ? '#444' : '#ddd'}`, backgroundColor: dark ? '#333' : '#fff', color: text, fontWeight: '600' }}>
                {Object.keys(players).map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            {h2h.games === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px', color: sub }}><div style={{ fontSize: '48px' }}>🤷</div><p>No games between {h2hP1} and {h2hP2}</p></div>
            ) : (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center', marginBottom: '20px' }}>
                  <div><div style={{ fontSize: '48px', fontWeight: '800', color: h2h.w1 > h2h.w2 ? '#34C759' : text }}>{h2h.w1}</div><div style={{ fontWeight: '600' }}>{h2hP1}</div></div>
                  <div style={{ color: sub }}><div style={{ fontSize: '24px', fontWeight: '700' }}>{h2h.games}</div><div>games</div></div>
                  <div><div style={{ fontSize: '48px', fontWeight: '800', color: h2h.w2 > h2h.w1 ? '#34C759' : text }}>{h2h.w2}</div><div style={{ fontWeight: '600' }}>{h2hP2}</div></div>
                </div>
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
              </>
            )}
          </div>
        )}

        {/* PLAYERS */}
        {tab === 'players' && (() => {
          const pStats = calculatePlayerStats(viewPlayer);
          const playerGames = games.filter(g => g.home === viewPlayer || g.away === viewPlayer);
          const recentGames = [...playerGames].reverse().slice(0, 5);
          const streak = getStreak(viewPlayer, games);
          const oppRecords = {};
          playerGames.forEach(g => {
            const opp = g.home === viewPlayer ? g.away : g.home;
            const won = (g.home === viewPlayer && g.scoreH > g.scoreA) || (g.away === viewPlayer && g.scoreA > g.scoreH);
            if (!oppRecords[opp]) oppRecords[opp] = { wins: 0, losses: 0 };
            if (won) oppRecords[opp].wins++; else oppRecords[opp].losses++;
          });
          return (
            <div style={{ backgroundColor: card, borderRadius: '16px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ margin: 0, fontSize: '20px' }}>👤 Player Stats</h2>
                <select value={viewPlayer} onChange={e => setViewPlayer(e.target.value)} style={{ padding: '10px 16px', borderRadius: '8px', border: `1px solid ${dark ? '#444' : '#ddd'}`, backgroundColor: dark ? '#333' : '#fff', color: text, fontWeight: '600', fontSize: '16px' }}>
                  {Object.keys(players).sort().map(name => <option key={name} value={name}>{name}</option>)}
                </select>
              </div>
              <div style={{ textAlign: 'center', marginBottom: '24px', padding: '20px', backgroundColor: dark ? '#333' : '#f5f5f5', borderRadius: '12px' }}>
                <div style={{ fontSize: '32px', fontWeight: '800', marginBottom: '4px' }}>{viewPlayer}</div>
                <div style={{ fontSize: '18px', color: sub }}>{pStats.wins}-{pStats.losses}</div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginTop: '16px' }}>
                  <div><div style={{ fontSize: '28px', fontWeight: '700', color: '#007AFF' }}>{pStats.elo}</div><div style={{ fontSize: '12px', color: sub }}>ELO</div></div>
                  <div><div style={{ fontSize: '28px', fontWeight: '700', color: streak.type === 'W' ? '#34C759' : '#FF3B30' }}>{streak.type ? `${streak.type}${streak.count}` : '—'}</div><div style={{ fontSize: '12px', color: sub }}>STREAK</div></div>
                  <div><div style={{ fontSize: '28px', fontWeight: '700' }}>{pStats.gp > 0 ? (pStats.points / pStats.gp).toFixed(1) : '—'}</div><div style={{ fontSize: '12px', color: sub }}>PPG</div></div>
                </div>
              </div>
              {Object.keys(oppRecords).length > 0 && (
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ fontSize: '12px', color: sub, marginBottom: '8px', fontWeight: '600' }}>VS OPPONENTS</div>
                  {Object.entries(oppRecords).sort((a, b) => (b[1].wins + b[1].losses) - (a[1].wins + a[1].losses)).map(([opp, record]) => (
                    <div key={opp} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', backgroundColor: dark ? '#333' : '#f9f9f9', borderRadius: '8px', marginBottom: '4px' }}>
                      <span style={{ fontWeight: '600' }}>{opp}</span>
                      <span style={{ color: record.wins > record.losses ? '#34C759' : record.losses > record.wins ? '#FF3B30' : sub }}>{record.wins}-{record.losses}</span>
                    </div>
                  ))}
                </div>
              )}
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
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ color: won ? '#34C759' : '#FF3B30', fontWeight: '700' }}>{won ? 'W' : 'L'}</span><span>vs {opp}</span></div>
                      <span style={{ fontWeight: '600' }}>{myScore}-{oppScore}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })()}

        {/* STATS */}
        {tab === 'stats' && (() => {
          const allScores = games.flatMap(g => [g.scoreH, g.scoreA]);
          const highScore = allScores.length > 0 ? Math.max(...allScores) : 0;
          const highScoreGame = games.find(g => g.scoreH === highScore || g.scoreA === highScore);
          const highScorer = highScoreGame ? (highScoreGame.scoreH === highScore ? highScoreGame.home : highScoreGame.away) : '—';
          const biggestMargin = games.length > 0 ? Math.max(...games.map(g => Math.abs(g.scoreH - g.scoreA))) : 0;
          let bestStreak = { name: '—', count: 0 };
          Object.keys(players).forEach(name => { const s = getStreak(name, games); if (s.type === 'W' && s.count > bestStreak.count) bestStreak = { name, count: s.count }; });
          let bestWinPct = { name: '—', pct: 0 };
          sorted.filter(p => p.gp >= 3).forEach(p => { const pct = p.wins / p.gp; if (pct > bestWinPct.pct) bestWinPct = { name: p.name, pct }; });
          return (
            <div style={{ backgroundColor: card, borderRadius: '16px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              <h2 style={{ margin: '0 0 16px', fontSize: '20px' }}>📊 League Stats</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                <div style={{ backgroundColor: dark ? '#333' : '#f5f5f5', padding: '20px', borderRadius: '12px', textAlign: 'center' }}><div style={{ fontSize: '32px', fontWeight: '700' }}>{games.length}</div><div style={{ color: sub }}>Total Games</div></div>
                <div style={{ backgroundColor: dark ? '#333' : '#f5f5f5', padding: '20px', borderRadius: '12px', textAlign: 'center' }}><div style={{ fontSize: '32px', fontWeight: '700' }}>{Object.keys(players).length}</div><div style={{ color: sub }}>Players</div></div>
                <div style={{ backgroundColor: dark ? '#333' : '#f5f5f5', padding: '20px', borderRadius: '12px', textAlign: 'center' }}><div style={{ fontSize: '32px', fontWeight: '700', color: '#34C759' }}>{highScore}</div><div style={{ color: sub }}>High Score ({highScorer})</div></div>
                <div style={{ backgroundColor: dark ? '#333' : '#f5f5f5', padding: '20px', borderRadius: '12px', textAlign: 'center' }}><div style={{ fontSize: '32px', fontWeight: '700', color: '#FF9500' }}>{biggestMargin}</div><div style={{ color: sub }}>Biggest Margin</div></div>
                <div style={{ backgroundColor: dark ? '#333' : '#f5f5f5', padding: '20px', borderRadius: '12px', textAlign: 'center' }}><div style={{ fontSize: '32px', fontWeight: '700' }}>W{bestStreak.count}</div><div style={{ color: sub }}>Best Streak ({bestStreak.name})</div></div>
                <div style={{ backgroundColor: dark ? '#333' : '#f5f5f5', padding: '20px', borderRadius: '12px', textAlign: 'center' }}><div style={{ fontSize: '32px', fontWeight: '700' }}>{(bestWinPct.pct * 100).toFixed(0)}%</div><div style={{ color: sub }}>Best Win% ({bestWinPct.name})</div></div>
              </div>
              <div style={{ marginTop: '24px', padding: '16px', backgroundColor: dark ? '#333' : '#f5f5f5', borderRadius: '12px' }}>
                <div style={{ fontSize: '12px', color: sub, marginBottom: '12px', fontWeight: '600' }}>DATA MANAGEMENT</div>
                <button onClick={handleResetData} style={{ padding: '10px 16px', backgroundColor: '#FF3B30', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>🗑️ Reset to Defaults</button>
              </div>
            </div>
          );
        })()}
      </div>

      {/* Game Detail Modal */}
      {selGame && (
        <div onClick={() => setSelGame(null)} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', zIndex: 1000 }}>
          <div onClick={e => e.stopPropagation()} style={{ backgroundColor: card, borderRadius: '16px', padding: '24px', maxWidth: '450px', width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0 }}>Game {selGame.id}</h3>
              <button onClick={() => setSelGame(null)} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: text }}>×</button>
            </div>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <div style={{ fontWeight: selGame.scoreH > selGame.scoreA ? '700' : '400', fontSize: '18px', color: selGame.scoreH > selGame.scoreA ? '#34C759' : text }}>{selGame.home} ({selGame.teamH}) {selGame.scoreH > selGame.scoreA && '✓'}</div>
              <div style={{ fontSize: '36px', fontWeight: '800', margin: '8px 0' }}>{selGame.scoreH} - {selGame.scoreA}</div>
              <div style={{ fontWeight: selGame.scoreA > selGame.scoreH ? '700' : '400', fontSize: '18px', color: selGame.scoreA > selGame.scoreH ? '#34C759' : text }}>{selGame.away} ({selGame.teamA}) {selGame.scoreA > selGame.scoreH && '✓'}</div>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => handleStartEdit(selGame)} style={{ flex: 1, padding: '12px', backgroundColor: '#007AFF', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: '600', cursor: 'pointer' }}>✏️ Edit</button>
              <button onClick={() => handleDeleteGame(selGame.id)} style={{ padding: '12px 16px', backgroundColor: '#FF3B30', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: '600', cursor: 'pointer' }}>🗑️</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Game Modal */}
      {editGame && (
        <div onClick={() => setEditGame(null)} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', zIndex: 1000 }}>
          <div onClick={e => e.stopPropagation()} style={{ backgroundColor: card, borderRadius: '16px', padding: '24px', maxWidth: '450px', width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h3 style={{ margin: 0 }}>✏️ Edit Game {editGame.id}</h3>
              <button onClick={() => setEditGame(null)} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: text }}>×</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '16px', alignItems: 'start' }}>
              <div>
                <label style={{ fontSize: '12px', color: sub }}>Home: {editGame.home}</label>
                <select value={editTeamH} onChange={e => setEditTeamH(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '8px', border: `1px solid ${dark ? '#444' : '#ddd'}`, backgroundColor: dark ? '#333' : '#fff', color: text, fontSize: '12px', marginBottom: '8px' }}>
                  {teams.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                <input type="number" value={editScoreH} onChange={e => setEditScoreH(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: `1px solid ${dark ? '#444' : '#ddd'}`, backgroundColor: dark ? '#333' : '#fff', color: text, fontSize: '18px', fontWeight: '700', textAlign: 'center', boxSizing: 'border-box' }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', paddingTop: '30px', fontWeight: '700', color: sub }}>VS</div>
              <div>
                <label style={{ fontSize: '12px', color: sub }}>Away: {editGame.away}</label>
                <select value={editTeamA} onChange={e => setEditTeamA(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '8px', border: `1px solid ${dark ? '#444' : '#ddd'}`, backgroundColor: dark ? '#333' : '#fff', color: text, fontSize: '12px', marginBottom: '8px' }}>
                  {teams.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                <input type="number" value={editScoreA} onChange={e => setEditScoreA(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: `1px solid ${dark ? '#444' : '#ddd'}`, backgroundColor: dark ? '#333' : '#fff', color: text, fontSize: '18px', fontWeight: '700', textAlign: 'center', boxSizing: 'border-box' }} />
              </div>
            </div>
            <button onClick={handleSaveEdit} style={{ width: '100%', padding: '14px', marginTop: '20px', backgroundColor: '#34C759', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: '700', fontSize: '16px', cursor: 'pointer' }}>Save Changes</button>
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
              <div>
                <label style={{ fontSize: '12px', color: sub }}>Home Player</label>
                <select value={newHome} onChange={e => setNewHome(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: `1px solid ${dark ? '#444' : '#ddd'}`, backgroundColor: dark ? '#333' : '#fff', color: text, marginBottom: '8px' }}>
                  {Object.keys(players).map(p => <option key={p} value={p}>{p}</option>)}
                </select>
                <select value={newTeamH} onChange={e => setNewTeamH(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '8px', border: `1px solid ${dark ? '#444' : '#ddd'}`, backgroundColor: dark ? '#333' : '#fff', color: text, fontSize: '12px', marginBottom: '8px' }}>
                  {teams.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                <input type="number" placeholder="Score" value={newScoreH} onChange={e => setNewScoreH(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: `1px solid ${dark ? '#444' : '#ddd'}`, backgroundColor: dark ? '#333' : '#fff', color: text, fontSize: '18px', fontWeight: '700', textAlign: 'center', boxSizing: 'border-box' }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', paddingTop: '30px', fontWeight: '700', color: sub }}>VS</div>
              <div>
                <label style={{ fontSize: '12px', color: sub }}>Away Player</label>
                <select value={newAway} onChange={e => setNewAway(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: `1px solid ${dark ? '#444' : '#ddd'}`, backgroundColor: dark ? '#333' : '#fff', color: text, marginBottom: '8px' }}>
                  {Object.keys(players).map(p => <option key={p} value={p}>{p}</option>)}
                </select>
                <select value={newTeamA} onChange={e => setNewTeamA(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '8px', border: `1px solid ${dark ? '#444' : '#ddd'}`, backgroundColor: dark ? '#333' : '#fff', color: text, fontSize: '12px', marginBottom: '8px' }}>
                  {teams.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                <input type="number" placeholder="Score" value={newScoreA} onChange={e => setNewScoreA(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: `1px solid ${dark ? '#444' : '#ddd'}`, backgroundColor: dark ? '#333' : '#fff', color: text, fontSize: '18px', fontWeight: '700', textAlign: 'center', boxSizing: 'border-box' }} />
              </div>
            </div>
            <button onClick={handleAddGame} disabled={!newScoreH || !newScoreA} style={{ width: '100%', padding: '14px', marginTop: '20px', backgroundColor: (!newScoreH || !newScoreA) ? '#ccc' : '#34C759', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: '700', fontSize: '16px', cursor: (!newScoreH || !newScoreA) ? 'not-allowed' : 'pointer' }}>Add Game</button>
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
            <input type="text" placeholder="Player Name" value={newPlayerName} onChange={e => setNewPlayerName(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleAddPlayer()} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: `1px solid ${dark ? '#444' : '#ddd'}`, backgroundColor: dark ? '#333' : '#fff', color: text, fontSize: '16px', marginBottom: '16px', boxSizing: 'border-box' }} />
            <button onClick={handleAddPlayer} disabled={!newPlayerName.trim()} style={{ width: '100%', padding: '14px', backgroundColor: !newPlayerName.trim() ? '#ccc' : '#34C759', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: '700', fontSize: '16px', cursor: !newPlayerName.trim() ? 'not-allowed' : 'pointer' }}>Add Player</button>
          </div>
        </div>
      )}
    </div>
  );
}

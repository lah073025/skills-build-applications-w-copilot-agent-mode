import { NavLink, Navigate, Route, Routes } from 'react-router-dom'

import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import './App.css'

function App() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-mark">OF</div>
        <div>
          <h1>OctoFit Tracker</h1>
          <p>{codespaceName ? `${codespaceName}-8000` : 'localhost:8000'}</p>
        </div>
        <nav aria-label="Primary navigation">
          <NavLink to="/users">Users</NavLink>
          <NavLink to="/teams">Teams</NavLink>
          <NavLink to="/activities">Activities</NavLink>
          <NavLink to="/leaderboard">Leaderboard</NavLink>
          <NavLink to="/workouts">Workouts</NavLink>
        </nav>
      </aside>
      <main className="content-panel">
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  )
}

export default App

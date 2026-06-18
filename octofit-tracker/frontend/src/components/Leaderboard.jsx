import { useEffect, useState } from 'react'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const leaderboardEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/'

const extractRecords = (payload) => {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.leaderboard)) return payload.leaderboard
  if (Array.isArray(payload?.results)) return payload.results
  if (Array.isArray(payload?.data)) return payload.data
  return []
}

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        const response = await fetch(leaderboardEndpoint)
        if (!response.ok) throw new Error(`Request failed with ${response.status}`)
        const payload = await response.json()
        setLeaderboard(extractRecords(payload))
        setStatus('ready')
      } catch (error) {
        setStatus(error.message)
      }
    }

    loadLeaderboard()
  }, [])

  if (status === 'loading') return <p className="status-text">Loading leaderboard...</p>
  if (status !== 'ready') return <p className="status-text error">{status}</p>

  return (
    <section className="data-section" aria-labelledby="leaderboard-heading">
      <div className="section-heading">
        <h2 id="leaderboard-heading">Leaderboard</h2>
        <span>{leaderboard.length} ranked</span>
      </div>
      <ol className="leaderboard-list">
        {leaderboard.map((entry) => (
          <li key={entry._id ?? `${entry.rank}-${entry.userName}`}>
            <span className="rank">#{entry.rank}</span>
            <div>
              <strong>{entry.userName}</strong>
              <span>{entry.teamName}</span>
            </div>
            <strong>{entry.points} pts</strong>
          </li>
        ))}
      </ol>
    </section>
  )
}

export default Leaderboard

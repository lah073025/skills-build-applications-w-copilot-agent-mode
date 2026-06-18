import { useEffect, useState } from 'react'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const teamsEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/'

const extractRecords = (payload) => {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.teams)) return payload.teams
  if (Array.isArray(payload?.results)) return payload.results
  if (Array.isArray(payload?.data)) return payload.data
  return []
}

function Teams() {
  const [teams, setTeams] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    const loadTeams = async () => {
      try {
        const response = await fetch(teamsEndpoint)
        if (!response.ok) throw new Error(`Request failed with ${response.status}`)
        const payload = await response.json()
        setTeams(extractRecords(payload))
        setStatus('ready')
      } catch (error) {
        setStatus(error.message)
      }
    }

    loadTeams()
  }, [])

  if (status === 'loading') return <p className="status-text">Loading teams...</p>
  if (status !== 'ready') return <p className="status-text error">{status}</p>

  return (
    <section className="data-section" aria-labelledby="teams-heading">
      <div className="section-heading">
        <h2 id="teams-heading">Teams</h2>
        <span>{teams.length} groups</span>
      </div>
      <div className="data-grid two-column">
        {teams.map((team) => (
          <article className="data-card" key={team._id ?? team.name}>
            <h3>{team.name}</h3>
            <p>{team.description}</p>
            <dl>
              <div>
                <dt>Captain</dt>
                <dd>{team.captainName}</dd>
              </div>
              <div>
                <dt>Members</dt>
                <dd>{Array.isArray(team.members) ? team.members.join(', ') : team.members}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Teams

import { useEffect, useState } from 'react'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const workoutsEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/'

const extractRecords = (payload) => {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.workouts)) return payload.workouts
  if (Array.isArray(payload?.results)) return payload.results
  if (Array.isArray(payload?.data)) return payload.data
  return []
}

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        const response = await fetch(workoutsEndpoint)
        if (!response.ok) throw new Error(`Request failed with ${response.status}`)
        const payload = await response.json()
        setWorkouts(extractRecords(payload))
        setStatus('ready')
      } catch (error) {
        setStatus(error.message)
      }
    }

    loadWorkouts()
  }, [])

  if (status === 'loading') return <p className="status-text">Loading workouts...</p>
  if (status !== 'ready') return <p className="status-text error">{status}</p>

  return (
    <section className="data-section" aria-labelledby="workouts-heading">
      <div className="section-heading">
        <h2 id="workouts-heading">Workouts</h2>
        <span>{workouts.length} suggestions</span>
      </div>
      <div className="data-grid">
        {workouts.map((workout) => (
          <article className="data-card" key={workout._id ?? workout.title}>
            <h3>{workout.title}</h3>
            <p>{workout.suggestedFor}</p>
            <dl>
              <div>
                <dt>Focus</dt>
                <dd>{workout.focusArea}</dd>
              </div>
              <div>
                <dt>Difficulty</dt>
                <dd>{workout.difficulty}</dd>
              </div>
              <div>
                <dt>Duration</dt>
                <dd>{workout.durationMinutes} min</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Workouts

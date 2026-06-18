import { useEffect, useState } from 'react'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const activitiesEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/'

const extractRecords = (payload) => {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.activities)) return payload.activities
  if (Array.isArray(payload?.results)) return payload.results
  if (Array.isArray(payload?.data)) return payload.data
  return []
}

function Activities() {
  const [activities, setActivities] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const response = await fetch(activitiesEndpoint)
        if (!response.ok) throw new Error(`Request failed with ${response.status}`)
        const payload = await response.json()
        setActivities(extractRecords(payload))
        setStatus('ready')
      } catch (error) {
        setStatus(error.message)
      }
    }

    loadActivities()
  }, [])

  if (status === 'loading') return <p className="status-text">Loading activities...</p>
  if (status !== 'ready') return <p className="status-text error">{status}</p>

  return (
    <section className="data-section" aria-labelledby="activities-heading">
      <div className="section-heading">
        <h2 id="activities-heading">Activities</h2>
        <span>{activities.length} logged</span>
      </div>
      <div className="data-table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Activity</th>
              <th>Duration</th>
              <th>Calories</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity._id ?? `${activity.userName}-${activity.activityDate}`}>
                <td>{activity.userName}</td>
                <td>{activity.activityType}</td>
                <td>{activity.durationMinutes} min</td>
                <td>{activity.caloriesBurned}</td>
                <td>{activity.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Activities

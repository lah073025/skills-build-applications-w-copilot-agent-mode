import { useEffect, useState } from 'react'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const usersEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/'

const extractRecords = (payload) => {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.users)) return payload.users
  if (Array.isArray(payload?.results)) return payload.results
  if (Array.isArray(payload?.data)) return payload.data
  return []
}

function Users() {
  const [users, setUsers] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await fetch(usersEndpoint)
        if (!response.ok) throw new Error(`Request failed with ${response.status}`)
        const payload = await response.json()
        setUsers(extractRecords(payload))
        setStatus('ready')
      } catch (error) {
        setStatus(error.message)
      }
    }

    loadUsers()
  }, [])

  if (status === 'loading') return <p className="status-text">Loading users...</p>
  if (status !== 'ready') return <p className="status-text error">{status}</p>

  return (
    <section className="data-section" aria-labelledby="users-heading">
      <div className="section-heading">
        <h2 id="users-heading">Users</h2>
        <span>{users.length} profiles</span>
      </div>
      <div className="data-grid">
        {users.map((user) => (
          <article className="data-card" key={user._id ?? user.email ?? user.name}>
            <h3>{user.name}</h3>
            <p>{user.email}</p>
            <dl>
              <div>
                <dt>Role</dt>
                <dd>{user.role}</dd>
              </div>
              <div>
                <dt>Favorite</dt>
                <dd>{user.favoriteActivity}</dd>
              </div>
              <div>
                <dt>Weekly Goal</dt>
                <dd>{user.weeklyGoalMinutes} min</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Users

import { useEffect, useState } from 'react';

function normalizeResponse(data) {
  if (Array.isArray(data)) return data;
  if (data?.data && Array.isArray(data.data)) return data.data;
  if (data?.results && Array.isArray(data.results)) return data.results;
  return [];
}

export default function Users({ apiBaseUrl }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`${apiBaseUrl}/users`)
      .then((res) => res.json())
      .then((data) => setUsers(normalizeResponse(data)))
      .catch((err) => setError(err.message || 'Failed to load users'))
      .finally(() => setLoading(false));
  }, [apiBaseUrl]);

  return (
    <section>
      <h2>Users</h2>
      {error && <p className="text-danger">{error}</p>}
      {loading ? (
        <p>Loading users...</p>
      ) : users.length ? (
        <div className="list-group">
          {users.map((user) => (
            <div key={user._id} className="list-group-item">
              <strong>{user.name}</strong>
              <div>{user.email}</div>
            </div>
          ))}
        </div>
      ) : (
        <p>No users found.</p>
      )}
    </section>
  );
}

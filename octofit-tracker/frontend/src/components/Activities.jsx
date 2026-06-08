import { useEffect, useState } from 'react';

// Codespaces API example: https://<VITE_CODESPACE_NAME>-8000.app.github.dev/api/activities
const codespaceActivitiesEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities`
  : null;

function normalizeResponse(data) {
  if (Array.isArray(data)) return data;
  if (data?.data && Array.isArray(data.data)) return data.data;
  if (data?.results && Array.isArray(data.results)) return data.results;
  return [];
}

export default function Activities({ apiBaseUrl }) {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const endpoint = codespaceActivitiesEndpoint || `${apiBaseUrl}/activities`;
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => setActivities(normalizeResponse(data)))
      .catch((err) => setError(err.message || 'Failed to load activities'))
      .finally(() => setLoading(false));
  }, [apiBaseUrl]);

  return (
    <section>
      <h2>Activities</h2>
      {error && <p className="text-danger">{error}</p>}
      {loading ? (
        <p>Loading activities...</p>
      ) : activities.length ? (
        <ul className="list-group">
          {activities.map((activity) => (
            <li key={activity._id} className="list-group-item">
              <strong>{activity.type}</strong> ({activity.duration} min, {activity.calories} cal)
              <div>User: {activity.user?.name || activity.user}</div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No activities found.</p>
      )}
    </section>
  );
}

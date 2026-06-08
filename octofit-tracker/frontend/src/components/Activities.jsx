import { useEffect, useState } from 'react';

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
    fetch(`${apiBaseUrl}/activities`)
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

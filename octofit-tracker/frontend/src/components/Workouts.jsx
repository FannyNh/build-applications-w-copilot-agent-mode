import { useEffect, useState } from 'react';

// Codespaces API example: https://<VITE_CODESPACE_NAME>-8000.app.github.dev/api/workouts
const codespaceWorkoutsEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts`
  : null;

function normalizeResponse(data) {
  if (Array.isArray(data)) return data;
  if (data?.data && Array.isArray(data.data)) return data.data;
  if (data?.results && Array.isArray(data.results)) return data.results;
  return [];
}

export default function Workouts({ apiBaseUrl }) {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const endpoint = codespaceWorkoutsEndpoint || `${apiBaseUrl}/workouts`;
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => setWorkouts(normalizeResponse(data)))
      .catch((err) => setError(err.message || 'Failed to load workouts'))
      .finally(() => setLoading(false));
  }, [apiBaseUrl]);

  return (
    <section>
      <h2>Workouts</h2>
      {error && <p className="text-danger">{error}</p>}
      {loading ? (
        <p>Loading workouts...</p>
      ) : workouts.length ? (
        <div className="list-group">
          {workouts.map((workout) => (
            <div key={workout._id} className="list-group-item">
              <strong>{workout.title}</strong>
              <div>{workout.description}</div>
              <div>Difficulty: {workout.difficulty}</div>
              <div>Duration: {workout.duration} min</div>
            </div>
          ))}
        </div>
      ) : (
        <p>No workouts found.</p>
      )}
    </section>
  );
}

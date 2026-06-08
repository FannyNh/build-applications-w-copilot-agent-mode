import { useEffect, useState } from 'react';

// Codespaces API example: https://<VITE_CODESPACE_NAME>-8000.app.github.dev/api/leaderboard
const codespaceLeaderboardEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard`
  : null;

function normalizeResponse(data) {
  if (Array.isArray(data)) return data;
  if (data?.data && Array.isArray(data.data)) return data.data;
  if (data?.results && Array.isArray(data.results)) return data.results;
  return [];
}

export default function Leaderboard({ apiBaseUrl }) {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const endpoint = codespaceLeaderboardEndpoint || `${apiBaseUrl}/leaderboard`;
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => setEntries(normalizeResponse(data)))
      .catch((err) => setError(err.message || 'Failed to load leaderboard'))
      .finally(() => setLoading(false));
  }, [apiBaseUrl]);

  return (
    <section>
      <h2>Leaderboard</h2>
      {error && <p className="text-danger">{error}</p>}
      {loading ? (
        <p>Loading leaderboard...</p>
      ) : entries.length ? (
        <div className="list-group">
          {entries.map((entry, index) => (
            <div key={`${entry.user?.id ?? entry.user}-${index}`} className="list-group-item">
              <strong>{entry.user?.name || 'Unknown user'}</strong>
              <div>Calories: {entry.totalCalories}</div>
              <div>Duration: {entry.totalDuration} min</div>
              <div>Activities: {entry.activityCount}</div>
            </div>
          ))}
        </div>
      ) : (
        <p>No leaderboard entries found.</p>
      )}
    </section>
  );
}

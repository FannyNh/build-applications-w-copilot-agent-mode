import { useEffect, useState } from 'react';

// Codespaces API example: https://<VITE_CODESPACE_NAME>-8000.app.github.dev/api/teams
const codespaceTeamsEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams`
  : null;

function normalizeResponse(data) {
  if (Array.isArray(data)) return data;
  if (data?.data && Array.isArray(data.data)) return data.data;
  if (data?.results && Array.isArray(data.results)) return data.results;
  return [];
}

export default function Teams({ apiBaseUrl }) {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const endpoint = codespaceTeamsEndpoint || `${apiBaseUrl}/teams`;
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => setTeams(normalizeResponse(data)))
      .catch((err) => setError(err.message || 'Failed to load teams'))
      .finally(() => setLoading(false));
  }, [apiBaseUrl]);

  return (
    <section>
      <h2>Teams</h2>
      {error && <p className="text-danger">{error}</p>}
      {loading ? (
        <p>Loading teams...</p>
      ) : teams.length ? (
        <div className="list-group">
          {teams.map((team) => (
            <div key={team._id} className="list-group-item">
              <strong>{team.name}</strong>
              <div>Members: {team.members?.map((member) => member.name || member).join(', ')}</div>
            </div>
          ))}
        </div>
      ) : (
        <p>No teams found.</p>
      )}
    </section>
  );
}

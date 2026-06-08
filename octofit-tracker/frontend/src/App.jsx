import { NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

function buildApiBaseUrl() {
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev/api`;
  }

  if (typeof window !== 'undefined') {
    const protocol = window.location.protocol === 'https:' ? 'https' : 'http';
    const host = window.location.hostname;

    if (host.endsWith('.app.github.dev') && host.includes('-5173')) {
      const backendHost = host.replace(/-5173(\.|$)/, '-8000$1');
      return `${protocol}://${backendHost}/api`;
    }

    return `${protocol}://${host}:8000/api`;
  }

  return 'http://localhost:8000/api';
}

const apiBaseUrl = buildApiBaseUrl();

function Home() {
  return (
    <section>
      <h2>OctoFit Tracker</h2>
      <p>
        This React frontend uses the backend API on port 8000. When running inside GitHub Codespaces,
        set <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> to enable the Codespaces URL.
      </p>
      <p>
        Current API base URL:
        <strong> {apiBaseUrl}</strong>
      </p>
      <ul>
        <li>Users</li>
        <li>Teams</li>
        <li>Activities</li>
        <li>Workouts</li>
        <li>Leaderboard</li>
      </ul>
    </section>
  );
}

export default function App() {
  return (
    <div className="container py-4">
      <header className="mb-4">
        <h1>OctoFit Tracker</h1>
        <p className="text-muted">
          React 19 app with Codespaces-aware backend routing.
        </p>
        <nav className="nav nav-pills gap-2">
          <NavLink className="nav-link" to="/">Home</NavLink>
          <NavLink className="nav-link" to="/users">Users</NavLink>
          <NavLink className="nav-link" to="/teams">Teams</NavLink>
          <NavLink className="nav-link" to="/activities">Activities</NavLink>
          <NavLink className="nav-link" to="/workouts">Workouts</NavLink>
          <NavLink className="nav-link" to="/leaderboard">Leaderboard</NavLink>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users apiBaseUrl={apiBaseUrl} />} />
          <Route path="/teams" element={<Teams apiBaseUrl={apiBaseUrl} />} />
          <Route path="/activities" element={<Activities apiBaseUrl={apiBaseUrl} />} />
          <Route path="/workouts" element={<Workouts apiBaseUrl={apiBaseUrl} />} />
          <Route path="/leaderboard" element={<Leaderboard apiBaseUrl={apiBaseUrl} />} />
        </Routes>
      </main>
    </div>
  );
}

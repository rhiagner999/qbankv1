import { useCallback, useEffect, useRef, useState } from 'react';
import Splash from './components/Splash.jsx';
import { loadData } from './data/loader.js';
import { startLegacy } from './legacy/app.js';

// Stage 1: React owns startup (data loading, loading/error screens).
// The screens themselves still run from src/legacy/app.js and are moved into
// React components stage by stage.
export default function App() {
  const [st, setSt] = useState({ phase: 'loading', done: 0, total: 0 });
  const started = useRef(false);

  const boot = useCallback(async () => {
    setSt({ phase: 'loading', done: 0, total: 0 });
    try {
      const data = await loadData((done, total) => setSt((s) => ({ ...s, done, total })));
      if (started.current) return;
      started.current = true;
      startLegacy(data);
      setSt({ phase: 'ready', done: 0, total: 0 });
    } catch (e) {
      console.error(e);
      setSt((s) => ({ ...s, phase: 'error' }));
    }
  }, []);

  useEffect(() => { boot(); }, [boot]);

  if (st.phase === 'ready') return null;
  return <Splash done={st.done} total={st.total} error={st.phase === 'error'} onRetry={boot} />;
}

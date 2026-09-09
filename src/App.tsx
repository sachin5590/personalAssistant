import { useEffect, useMemo, useState } from 'react';
import Archive from './pages/archive/Archive';
import Today from './pages/today/Today';
import Layout from './layout/Layout';
import styles from './app.module.css';
import AllTasks from './pages/allTasks/AllTasks';
import TaskProvider from './contexts/TaskContext';

const DEFAULT_ROUTE = '#today'
const MAX_WIDTH = 768;

function App() {
  const [route, setRoute] = useState(window.location.hash || DEFAULT_ROUTE);

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(window.location.hash || DEFAULT_ROUTE);
    };
    
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    }
  }, []);

  const isDesktop = window.innerWidth >= MAX_WIDTH;

  let content;
  if (route === '#archive') {
    content = <Archive />;
  } else if (route === '#all-tasks') {
    content = <AllTasks />;
  } else {
    content = <Today />;
  }
  console.log('window.innerWidth: ', window.innerWidth);

  return (
    <TaskProvider>
      <div className={styles.app}>
        <Layout content={content} isDesktop={isDesktop} />
      </div>
    </TaskProvider>
  );
}

export default App;

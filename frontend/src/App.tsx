import { RouterProvider } from 'react-router-dom';
import './App.css';
import routes from './router/routes';
import { useEffect } from 'react';
import { colors } from './utils/colors';

function App() {
  useEffect(() => {
    const root = document.documentElement;
    Object.keys(colors).forEach((key) => {
      root.style.setProperty(`--${key}`, colors[key as keyof typeof colors]);
    });
  }, []);

  return <RouterProvider router={routes} />;
}

export default App;

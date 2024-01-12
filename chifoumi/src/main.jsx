import React from 'react';
import ReactDOM from 'react-dom';
import LoginPage from './routes/loginPage';
import RegisterPage from './routes/registerPage';
import MatchesPage from './routes/matchesPage';
import Match from './routes/match';
import App from './App';
import MatchDetailsPage from './routes/matchDetailPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

//import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
  },
  {
    path: '/login',
    element: <LoginPage/>,
  },
  {
    path: '/register',
    element: <RegisterPage/>,
  },
  {
    path: '/matches',
    element: <MatchesPage />, 
  },
  {
    path: '/matches/:id', 
    element: <MatchDetailsPage />,
  },
  {
    path: '/matches/:id/play', 
    element: <Match />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

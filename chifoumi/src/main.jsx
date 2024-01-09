import React from 'react';
import ReactDOM from 'react-dom';
import LoginPage from './routes/loginPage';
import RegisterPage from './routes/registerPage';
import MatchesPage from './routes/matchesPage';
import Match from './routes/match';
import MatchDetailsPage from './routes/matchDetailPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

//import './index.css';

const router = createBrowserRouter([
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
    element: <MatchesPage />, // Ajoutez la route vers votre DashboardPage
  },
  {
    path: '/matches/:id', // Renommez la route pour la page de jeu avec un paramètre d'ID
    element: <MatchDetailsPage />,
  },
  {
    path: '/matches/:id/play', // Renommez la route pour la page de jeu avec un paramètre d'ID
    element: <Match />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

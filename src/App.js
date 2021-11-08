import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as ROUTES from './constants/routes';

import { AuthProvider } from './context/auth';
import AuthRoute from './util/AuthRoute';
import RegisterRoute from './util/RegisterRoute';

const Login = lazy(() => import('./pages/login'));
const SignUp = lazy(() => import('./pages/sign-up'));
const Profile = lazy(() => import('./pages/profile'));
const Dashboard = lazy(() => import('./pages/dashboard'));
const NotFound = lazy(() => import('./pages/not-found'));
const MoviePage = lazy(() => import('./pages/movie-page'));
const TVShowPage = lazy(() => import('./pages/tv-page'));
const BookPage = lazy(() => import('./pages/book-page'));
const GamePage = lazy(() => import('./pages/game-page'));

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Suspense fallback={<p>Loading...</p>}>
          <Switch>
            <AuthRoute path={ROUTES.LOGIN} component={Login} />
            <AuthRoute path={ROUTES.SIGN_UP} component={SignUp} />
            <Route path={ROUTES.MOVIE_PAGE} component={MoviePage} />
            <Route path={ROUTES.TVSHOW_PAGE} component={TVShowPage} />
            <Route path={ROUTES.BOOK_PAGE} component={BookPage} />
            <Route path={ROUTES.GAME_PAGE} component={GamePage} />
            <RegisterRoute path={ROUTES.PROFILE} component={Profile} />
            <Route path={ROUTES.DASHBOARD} component={Dashboard} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Router>
    </AuthProvider>
  );
}

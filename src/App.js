import { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as ROUTES from './constants/routes';
import { heroSearchBG } from './components/dashboard/hero-search/hero-search-bg';

const Login = lazy(() => import('./pages/login'));
const SignUp = lazy(() => import('./pages/sign-up'));
const Profile = lazy(() => import('./pages/profile'));
const Dashboard = lazy(() => import('./pages/dashboard'));
const NotFound = lazy(() => import('./pages/not-found'));
const MoviePage = lazy(() => import('./pages/movie-page'));
const TVShowPage = lazy(() => import('./pages/tv-show-page'));

export default function App() {
  return (
    <Router>
      <Suspense fallback={<p>Loading...</p>}>
        <Switch>
          <Route path={ROUTES.LOGIN} component={Login} />
          <Route path={ROUTES.SIGN_UP} component={SignUp} />
          <Route path={ROUTES.MOVIE_PAGE} component={MoviePage} />
          <Route path={ROUTES.TVSHOW_PAGE} component={TVShowPage} />
          <Route path={ROUTES.DASHBOARD} component={Dashboard} />
          <Route path={ROUTES.PROFILE} component={Profile} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </Router>
  );
}

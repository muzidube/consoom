import { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as ROUTES from '../constants/routes';
import { AuthContext } from '../context/auth';

export default function AuthRoute({ component: Component, ...rest }) {
  const { user } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) => (user ? <Redirect to={ROUTES.DASHBOARD} /> : <Component {...props} />)}
    />
  );
}

AuthRoute.propTypes = {
  component: PropTypes.object.isRequired
};

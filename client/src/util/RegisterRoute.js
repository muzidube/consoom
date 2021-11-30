import { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as ROUTES from '../constants/routes';
import { AuthContext } from '../context/auth';

export default function RegisterRoute({ component: Component, ...rest }) {
  const { user } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) => (user ? <Component {...props} /> : <Redirect to={ROUTES.LOGIN} />)}
    />
  );
}

RegisterRoute.propTypes = {
  component: PropTypes.object.isRequired
};

/* eslint-disable no-use-before-define */
import { useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import * as ROUTES from '../constants/routes';

import { AuthContext } from '../context/auth';
import { useForm } from '../hooks/login-sign-up-hooks';

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default function Login() {
  const context = useContext(AuthContext);
  const history = useHistory();

  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    username: '',
    password: ''
  });

  const [loginUser] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      context.login(userData);
      history.push(ROUTES.DASHBOARD);
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: values
  });

  function loginUserCallback() {
    loginUser();
  }

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    document.title - 'Login - Consume';
  }, []);

  return (
    <div className="container flex mx-auto max-w-screen-lg items-center h-screen">
      <div className="flex w-3/5 mr-5">
        <img src="/images/Consume-Big-fafafa.jpg" alt="iPhone with profile" />
      </div>
      <div className="flex flex-col w-2/5">
        <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded">
          <h1 className="flex justify-center w-full mb-5">
            <img src="/images/Consume-Media-Logo.png" alt="Consume" className="mt-2 w-6/12" />
          </h1>

          <form onSubmit={onSubmit} noValidate>
            <input
              aria-label="Enter your username"
              type="text"
              placeholder="Username"
              name="username"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              value={values.username}
              onChange={onChange}
            />
            <input
              aria-label="Enter your password"
              type="password"
              placeholder="Password"
              name="password"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              value={values.password}
              onChange={onChange}
            />
            <button
              //   disabled={isInvalid}
              type="submit"
              className="bg-orange-medium text-white w-full rounded h-8 font-bold"
            >
              Log In
            </button>
          </form>
        </div>
        <div className="flex justify-center items-center flex-col w-full bg-white p-4 border border-gray-primary rounded">
          <p className="text-sm">
            Don't have an account?
            <Link to={ROUTES.SIGN_UP} className="font-bold text-green-medium ml-1">
              Sign Up
            </Link>
          </p>
        </div>
        {Object.keys(errors).length > 0 && (
          <div className="ui-error-message mt-2 text-red-900">
            <ul className="list-disc">
              {Object.values(errors).map((value) => (
                <li key={value}>{value}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

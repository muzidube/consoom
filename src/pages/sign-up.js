import { useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import * as ROUTES from '../constants/routes';

import { AuthContext } from '../context/auth';
import useForm from '../hooks/login-sign-up-hooks';

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

const CREATE_LIST_MUTATION = gql`
  mutation createList($name: String!, $type: String!) {
    createList(name: $name, type: $type) {
      id
      name
      type
      createdAt
      username
      user
      items {
        id
        addedAt
      }
      itemCount
      likeCount
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;

export default function SignUp() {
  const context = useContext(AuthContext);
  const history = useHistory();

  const [errors, setErrors] = useState({});

  // eslint-disable-next-line no-use-before-define
  const { onChange, onSubmit, values } = useForm(registerUser, {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    type: ''
  });

  const [MoviesWatchlist] = useMutation(CREATE_LIST_MUTATION, {
    update() {},
    onError(err) {
      console.log('errors: ', err.graphQLErrors[0]);
      // setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: {
      name: 'Watchlist',
      type: 'Movie'
    }
  });
  const [MoviesFavourites] = useMutation(CREATE_LIST_MUTATION, {
    update() {},
    onError(err) {
      console.log('errors: ', err.graphQLErrors[0]);
      // setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: {
      name: 'Favourites',
      type: 'Movie'
    }
  });
  const [MoviesWatched] = useMutation(CREATE_LIST_MUTATION, {
    update() {},
    onError(err) {
      console.log('errors: ', err.graphQLErrors[0]);
      // setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: {
      name: 'Watched',
      type: 'Movie'
    }
  });
  const [TVWatchlist] = useMutation(CREATE_LIST_MUTATION, {
    update() {},
    onError(err) {
      console.log('errors: ', err.graphQLErrors[0]);
      // setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: {
      name: 'Watchlist',
      type: 'TV'
    }
  });
  const [TVFavourites] = useMutation(CREATE_LIST_MUTATION, {
    update() {},
    onError(err) {
      console.log('errors: ', err.graphQLErrors[0]);
      // setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: {
      name: 'Favourites',
      type: 'TV'
    }
  });
  const [TVWatched] = useMutation(CREATE_LIST_MUTATION, {
    update() {},
    onError(err) {
      console.log('errors: ', err.graphQLErrors[0]);
      // setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: {
      name: 'Watched',
      type: 'TV'
    }
  });
  const [BooksToRead] = useMutation(CREATE_LIST_MUTATION, {
    update() {},
    onError(err) {
      console.log('errors: ', err.graphQLErrors[0]);
      // setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: {
      name: 'To Read',
      type: 'Book'
    }
  });
  const [BooksFavourites] = useMutation(CREATE_LIST_MUTATION, {
    update() {},
    onError(err) {
      console.log('errors: ', err.graphQLErrors[0]);
      // setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: {
      name: 'Favourites',
      type: 'Book'
    }
  });
  const [BooksRead] = useMutation(CREATE_LIST_MUTATION, {
    update() {},
    onError(err) {
      console.log('errors: ', err.graphQLErrors[0]);
      // setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: {
      name: 'Read',
      type: 'Book'
    }
  });
  const [GamesToPlay] = useMutation(CREATE_LIST_MUTATION, {
    update() {},
    onError(err) {
      console.log('errors: ', err.graphQLErrors[0]);
      // setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: {
      name: 'To Play',
      type: 'Game'
    }
  });
  const [GamesFavourites] = useMutation(CREATE_LIST_MUTATION, {
    update() {},
    onError(err) {
      console.log('errors: ', err.graphQLErrors[0]);
      // setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: {
      name: 'Favourites',
      type: 'Game'
    }
  });
  const [GamesPlayed] = useMutation(CREATE_LIST_MUTATION, {
    update() {},
    onError(err) {
      console.log('errors: ', err.graphQLErrors[0]);
      // setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: {
      name: 'Played',
      type: 'Game'
    }
  });
  const [MusicToListen] = useMutation(CREATE_LIST_MUTATION, {
    update() {},
    onError(err) {
      console.log('errors: ', err.graphQLErrors[0]);
      // setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: {
      name: 'To Listen',
      type: 'Music'
    }
  });
  const [MusicFavourites] = useMutation(CREATE_LIST_MUTATION, {
    update() {},
    onError(err) {
      console.log('errors: ', err.graphQLErrors[0]);
      // setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: {
      name: 'Favourites',
      type: 'Music'
    }
  });
  const [MusicListened] = useMutation(CREATE_LIST_MUTATION, {
    update() {},
    onError(err) {
      console.log('errors: ', err.graphQLErrors[0]);
      // setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: {
      name: 'Listened',
      type: 'Music'
    }
  });

  const [addUser] = useMutation(REGISTER_USER, {
    update(_, { data: { register: userData } }) {
      context.login(userData);
      MoviesWatchlist();
      MoviesFavourites();
      MoviesWatched();

      TVWatchlist();
      TVFavourites();
      TVWatched();

      BooksToRead();
      BooksFavourites();
      BooksRead();

      GamesToPlay();
      GamesFavourites();
      GamesPlayed();

      MusicToListen();
      MusicFavourites();
      MusicListened();
      history.push(ROUTES.DASHBOARD);
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: values
  });

  function registerUser() {
    addUser();
  }

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    document.title - 'Sign Up - Consume';
  }, []);

  return (
    <div className="container flex flex-col mx-auto max-w-screen-lg items-center h-screen justify-center">
      <div className="flex w-2/5 mb-10">
        <img className="mx-auto" src="/images/Consume-C-fafafa.jpg" alt="iPhone with profile" />
      </div>
      <div className="flex flex-col w-4/5 md:w-2/5">
        <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded">
          <h1 className="flex justify-center w-full mb-5">
            <img src="/images/Consume-Media-Logo-Black.png" alt="Consume" className="mt-2 w-6/12" />
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
              aria-label="Enter your email address"
              type="text"
              placeholder="Email Address"
              name="email"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={onChange}
              value={values.email}
            />
            <input
              aria-label="Enter your password"
              type="password"
              placeholder="Password"
              name="password"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={onChange}
              value={values.password}
            />
            <input
              aria-label="Confirm password"
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={onChange}
              value={values.confirmPassword}
            />
            <button
              //   disabled={isInvalid}
              type="submit"
              className="bg-red-primary text-white w-full rounded h-8 font-bold"
            >
              Sign Up
            </button>
          </form>
        </div>
        <div className="flex justify-center items-center flex-col w-full bg-white p-4 border border-gray-primary rounded">
          <p className="text-sm">
            Have an account?
            <Link to={ROUTES.LOGIN} className="font-bold text-red-primary ml-1">
              Log In
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

import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/login-sign-up-hooks';
import * as ROUTES from '../../constants/routes';

const CREATE_LIST_MUTATION = gql`
  mutation createList($name: String!, $type: String!) {
    createList(name: $name, type: $type) {
      id
      body
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

export default function ListForm() {
  // eslint-disable-next-line no-use-before-define
  const { values, onChange, onSubmit } = useForm(createListCallback, {
    name: '',
    type: ''
  });

  const [createList, { error }] = useMutation(CREATE_LIST_MUTATION, {
    variables: values,
    update(_, result) {
      console.log(result);
      values.body = '';
    }
  });

  function createListCallback() {
    createList();
  }
  return (
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
      {/* {Object.keys(errors).length > 0 && (
        <div className="ui-error-message mt-2 text-red-900">
          <ul className="list-disc">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )} */}
    </div>
  );
}

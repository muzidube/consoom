import gql from 'graphql-tag';
import { useState, useContext, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import useForm from '../../hooks/login-sign-up-hooks';
import * as ROUTES from '../../constants/routes';

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

export default function ListForm() {
  const [errors, setErrors] = useState({});
  // eslint-disable-next-line no-use-before-define
  const { values, onChange, onSubmit } = useForm(createListCallback, {
    name: '',
    type: ''
  });

  const [createList, { error }] = useMutation(CREATE_LIST_MUTATION, {
    update(_, result) {
      console.log(result);
    },
    onError(err) {
      console.log('errors: ', err.graphQLErrors);
      // setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: {
      name: 'please',
      type: 'ok'
    }
  });

  function createListCallback() {
    createList();
  }
  return (
    <div className="flex flex-col w-2/5">
      <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded">
        <h1 className="flex justify-center w-full mb-5">
          <p className="font-bebas text-2.5em text-center text-white">Consoom</p>
        </h1>

        <form onSubmit={onSubmit} noValidate>
          <input
            aria-label="Enter your name"
            type="text"
            placeholder="Name"
            name="name"
            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
            value={values.name}
            onChange={onChange}
          />
          <input
            aria-label="Enter your type"
            type="type"
            placeholder="Type"
            name="type"
            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
            value={values.type}
            onChange={onChange}
          />
          <button
            //   disabled={isInvalid}
            type="submit"
            className="bg-orange-medium text-white w-full rounded h-8 font-bold"
          >
            Create List
          </button>
        </form>
      </div>
    </div>
  );
}

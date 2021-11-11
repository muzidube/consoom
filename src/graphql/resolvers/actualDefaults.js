import { useState, useContext, useEffect } from 'react';
// import { useHistory } from 'react-router';
import { Link, useHistory } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import * as ROUTES from '../../constants/routes';

import { AuthContext } from '../../context/auth';
import { useForm } from '../../hooks/login-sign-up-hooks';

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

export function DefaultLists() {
  const [MoviesWatchlist, { error }] = useMutation(CREATE_LIST_MUTATION, {
    update(_, result) {
      console.log(result);
    },
    onError(err) {
      console.log('errors: ', err.graphQLErrors[0]);
      // setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: {
      name: 'Movies',
      type: 'Movies'
    }
  });
  return MoviesWatchlist;
}

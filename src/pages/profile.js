/* eslint-disable*/
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

import Thing from '../components/Thing';

const FETCH_LISTS_QUERY = gql`
  {
    getLists {
      id
      name
      type
      username
      createdAt
      itemCount
      items {
        id
        addedAt
      }
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

export default function Profile() {
  const { loading, data } = useQuery(FETCH_LISTS_QUERY);
  const lists = data.getLists;
  return (
    <div>
      <p>Hello World!</p>
      <div>
        {loading ? (
          <h1>Loading lists...</h1>
        ) : (
          lists &&
          lists.map((list) => (
            <div>
              <Thing key={list.id} list={list} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

import { useMutation, useQuery } from '@apollo/client';
import GET_USER_LIST_QUERY from './get-user-list';

export default function UserListQuery(userIDValue) {
  const { loading, data } = useQuery(GET_USER_LIST_QUERY, {
    variables: {
      userID: userIDValue,
      listName: 'Movies - Watchlist'
    }
  });

  return { loading, data };
}

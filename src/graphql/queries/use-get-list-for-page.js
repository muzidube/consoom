import { useQuery } from '@apollo/client';
import GET_LIST_PAGE_QUERY from './get-list-for-page';

export default function UserListQuery(userIDValue, listFor, listTypeFor) {
  const { loading, data } = useQuery(GET_LIST_PAGE_QUERY, {
    variables: {
      userID: userIDValue,
      listName: listFor,
      listType: listTypeFor
    }
  });

  return { loading, data };
}

import gql from 'graphql-tag';

const GET_LIST_PAGE_QUERY = gql`
  query getListForPage($userID: ID!, $listName: String!, $listType: String!) {
    getListForPage(userID: $userID, listName: $listName, listType: $listType) {
      id
      name
      type
      username
      user
      createdAt
      items {
        id
        addedAt
      }
      itemCount
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

export default GET_LIST_PAGE_QUERY;

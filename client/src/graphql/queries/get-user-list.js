import gql from 'graphql-tag';

const GET_USER_LIST_QUERY = gql`
  query getUserList($userID: ID!, $listName: String!, $listType: String!) {
    getUserList(userID: $userID, listName: $listName, listType: $listType) {
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

export default GET_USER_LIST_QUERY;

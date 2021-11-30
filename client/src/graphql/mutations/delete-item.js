import gql from 'graphql-tag';

const DELETE_ITEM_MUTATION = gql`
  mutation deleteItem($listID: ID!, $itemID: ID!) {
    deleteItem(listID: $listID, itemID: $itemID) {
      id
      items {
        id
        addedAt
      }
      itemCount
    }
  }
`;

export default DELETE_ITEM_MUTATION;

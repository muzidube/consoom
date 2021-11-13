import gql from 'graphql-tag';

const ADD_ITEM_MUTATION = gql`
  mutation addItem($listID: ID!, $itemID: ID!) {
    addItem(listID: $listID, itemID: $itemID) {
      id
      items {
        id
        addedAt
      }
      itemCount
    }
  }
`;

export default ADD_ITEM_MUTATION;

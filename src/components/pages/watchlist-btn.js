/* eslint-disable no-nested-ternary */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import * as ROUTES from '../../constants/routes';

const ADD_ITEM_MUTATION = gql`
mutation addItem(listID: ID!, id: ID!){
    addItem(listID: $listID, id: $itemID ) {
        id
        items{
            id
            addedAt
        }
        itemCount
    }
}
`;

export default function WatchlistBtn({ user, list: { id, items, itemCount } }) {
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (user && items.find((item) => item.id === id)) {
      setAdded(true);
    } else setAdded(false);
  }, [user, items]);

  const [addItem] = useMutation(ADD_ITEM_MUTATION, {
    variables: { listID: id, id: itemID }
  });

  const watchlistButton = user ? (
    added ? (
      <div
        className="no_click box-border rounded-50% w-46px h-46px inline-flex items-center content-center justify-center text-white list-none bg-white"
        href="#"
      >
        <span className="text-white relative top-0 left-0 inline-flex items-center content-center min-w-1em min-h-1em w-2em h-2em bg-center bg-no-repeat box-border font-normal list-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </span>
      </div>
    ) : (
      <div
        className="no_click box-border rounded-50% w-46px h-46px inline-flex items-center content-center justify-center text-white list-none bg-red-primary"
        href="#"
      >
        <span className="text-white relative top-0 left-0 inline-flex items-center content-center min-w-1em min-h-1em w-2em h-2em bg-center bg-no-repeat box-border font-normal list-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </span>
      </div>
    )
  ) : (
    <Link to={ROUTES.LOGIN}>
      <div
        className="no_click box-border rounded-50% w-46px h-46px inline-flex items-center content-center justify-center text-white list-none bg-gray-primary"
        href="#"
      >
        <span className="text-white relative top-0 left-0 inline-flex items-center content-center min-w-1em min-h-1em w-2em h-2em bg-center bg-no-repeat box-border font-normal list-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </span>
      </div>
    </Link>
  );

  return (
    <li className="mark-watched py-0.5 mr-5 text-white box-border list-none">{watchlistButton}</li>
  );
}

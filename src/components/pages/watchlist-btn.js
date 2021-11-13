/* eslint-disable no-nested-ternary */
import { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import * as ROUTES from '../../constants/routes';
import { AuthContext } from '../../context/auth';

import ADD_ITEM_MUTATION from '../../graphql/mutations/add-item';
import DELETE_ITEM_MUTATION from '../../graphql/mutations/delete-item';
import GET_USER_LIST_QUERY from '../../graphql/queries/get-user-list';

export default function WatchlistBtn({ itemID }) {
  const { user } = useContext(AuthContext);

  const [added, setAdded] = useState(false);
  const [listValueID, setListValueID] = useState('');
  const [listValueItems, setListValueItems] = useState([]);

  const { loading, data } = useQuery(GET_USER_LIST_QUERY, {
    variables: {
      userID: user.id,
      listName: 'Movies - Watchlist'
    }
  });

  useEffect(() => {
    if (!loading) {
      setListValueID(data.getUserList.id);
      setListValueItems(data.getUserList.items);
      console.log(listValueID);
    }
  }, []);

  const [addItem] = useMutation(ADD_ITEM_MUTATION, {
    update(_, data) {
      setAdded(true);
    },
    onError(err) {
      console.log('errors: ', err.graphQLErrors[0]);
      // setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: { listID: listValueID, itemID }
  });

  const [deleteItem] = useMutation(DELETE_ITEM_MUTATION, {
    update(_, data) {
      setAdded(false);
    },
    onError(err) {
      console.log('errors: ', err.graphQLErrors[0]);
      // setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: { listID: listValueID, itemID }
  });

  function MovieID() {
    console.log(listValueItems);
  }

  useEffect(() => {
    if (user && listValueItems.find((item) => item.id === itemID.toString())) {
      setAdded(true);
    } else setAdded(false);
  }, [user, listValueItems]);

  const watchlistButton = user ? (
    added ? (
      <div
        className="no_click box-border rounded-50% w-46px h-46px inline-flex items-center content-center justify-center text-white list-none bg-transparent"
        href="#"
      >
        <span className="text-white relative top-0 left-0 inline-flex items-center content-center min-w-1em min-h-1em w-2em h-2em bg-center bg-no-repeat box-border font-normal list-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#f87666"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </span>
      </div>
    ) : (
      <div
        className="no_click box-border rounded-50% w-46px h-46px inline-flex items-center content-center justify-center text-white list-none bg-transparent"
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
    <li className="mark-watched py-0.5 mr-5 text-white box-border list-none">
      {loading ? (
        <h1>Loading data...</h1>
      ) : (
        <button className="" type="button" onClick={added ? deleteItem : addItem}>
          {watchlistButton}
        </button>
      )}
    </li>
  );
}

WatchlistBtn.propTypes = {
  itemID: PropTypes.number.isRequired,
  list: PropTypes.shape({
    id: PropTypes.string,
    items: PropTypes.array,
    itemCount: PropTypes.number
  }).isRequired
};

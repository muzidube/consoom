/* eslint-disable no-nested-ternary */
import { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import MoonLoader from 'react-spinners/MoonLoader';
import { AuthContext } from '../../context/auth';

import * as ROUTES from '../../constants/routes';
import ADD_ITEM_MUTATION from '../../graphql/mutations/add-item';
import DELETE_ITEM_MUTATION from '../../graphql/mutations/delete-item';
import UserListQuery from '../../graphql/queries/use-get-user-lists';

export default function WatchlistBtn({ listToAdd }) {
  const { user } = useContext(AuthContext);
  const { id } = useParams();

  const [userInfo, setUserInfo] = useState(user ? user.id : '');
  const [added, setAdded] = useState(false);
  const [listValueID, setListValueID] = useState('');
  const [listValueItems, setListValueItems] = useState([]);

  const listFor = listToAdd;
  const listTypeFor = document.URL.split('/')[3];

  const QueryValues = UserListQuery(userInfo, listFor, listTypeFor);

  useEffect(() => {
    setUserInfo(user ? user.id : '');
    if (user && !QueryValues.loading) {
      setListValueID(QueryValues.data.getUserList.id);
      setListValueItems(QueryValues.data.getUserList.items);
    }
    if (user && listValueItems.find((item) => item.id === id)) {
      setAdded(true);
    } else setAdded(false);
  });

  const [addItem] = useMutation(ADD_ITEM_MUTATION, {
    update() {
      setAdded(true);
    },
    onError(err) {
      console.log('errors: ', err);
      // setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: { listID: listValueID, itemID: id }
  });

  const [deleteItem] = useMutation(DELETE_ITEM_MUTATION, {
    update() {
      setAdded(false);
    },
    onError(err) {
      console.log('errors: ', err.graphQLErrors[0]);
      // setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: { listID: listValueID, itemID: id }
  });

  const watchlistButton = user ? (
    added ? (
      <button className="" type="button" onClick={added ? deleteItem : addItem}>
        <div
          className="no_click box-border rounded-50% w-46px h-46px inline-flex items-center content-center justify-center text-white list-none bg-transparent"
          href="#"
        >
          <span className="text-white relative top-0 left-0 inline-flex items-center content-center min-w-1em min-h-1em w-2em h-2em bg-center bg-no-repeat box-border font-normal list-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 20 20"
              stroke="black"
              fill="#f87666"
            >
              <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
            </svg>
          </span>
        </div>
      </button>
    ) : (
      <button className="" type="button" onClick={added ? deleteItem : addItem}>
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
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          </span>
        </div>
      </button>
    )
  ) : (
    <Link to={ROUTES.LOGIN}>
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
    </Link>
  );

  return (
    <li className="mark-watched py-0.5 mr-5 text-white box-border list-none">{watchlistButton}</li>
  );
}

WatchlistBtn.propTypes = {
  listToAdd: PropTypes.string.isRequired
};

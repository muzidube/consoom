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

export default function FavouriteBtn({ listToAdd }) {
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
      setListValueID('');
      setListValueItems('');
      setListValueID(QueryValues.data.getUserList.id);
      setListValueItems(QueryValues.data.getUserList.items);
    }
    if (user && listValueItems.find((item) => item.id === id.toString())) {
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

  const favouriteButton = user ? (
    added ? (
      <button className="" type="button" onClick={added ? deleteItem : addItem}>
        <div
          className="no_click box-border rounded-50% w-46px h-46px inline-flex items-center content-center justify-center text-white list-none bg-transparent"
          href="#"
        >
          <span className="text-white relative top-0 left-0 inline-flex items-center content-center min-w-1em min-h-1em w-2em h-2em bg-center bg-no-repeat box-border font-normal list-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#f87666"
              viewBox="0 0 24 24"
              stroke="#f87666"
              tabIndex={0}
              className="w-8 select-none cursor-pointer focus:outline-none"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
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
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              tabIndex={0}
              className="w-8 select-none cursor-pointer focus:outline-none"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
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
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            tabIndex={0}
            className="w-8 select-none cursor-pointer focus:outline-none"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </span>
      </div>
    </Link>
  );

  return (
    <li className="mark-watched py-0.5 mr-5 text-white box-border list-none">
      {QueryValues.loading ? <MoonLoader loading color="#000" size={20} /> : favouriteButton}
    </li>
  );
}

FavouriteBtn.propTypes = {
  listToAdd: PropTypes.string.isRequired
};

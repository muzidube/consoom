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

export default function WatchedBtn({ listToAdd }) {
  const { user } = useContext(AuthContext);
  const { id } = useParams();

  const [userInfo, setUserInfo] = useState(user ? user.id : '');
  const [added, setAdded] = useState(false);
  const [listValueID, setListValueID] = useState('');
  const [listValueItems, setListValueItems] = useState([]);

  const listFor = listToAdd;

  const QueryValues = UserListQuery(userInfo, listFor);

  useEffect(() => {
    setUserInfo(user ? user.id : '');
    if (user && !QueryValues.loading) {
      setListValueID('');
      setListValueItems('');
      setListValueID(QueryValues.data.getUserList.id);
      setListValueItems(QueryValues.data.getUserList.items);
      console.log('listValueID: ', listValueID);
    }
    if (user && listValueItems.find((item) => item.id === id.toString())) {
      setAdded(true);
    } else setAdded(false);
  });

  const [addItem] = useMutation(ADD_ITEM_MUTATION, {
    update(_, data) {
      setAdded(true);
    },
    onError(err) {
      console.log('errors: ', err.graphQLErrors[0]);
      // setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: { listID: listValueID, itemID: id }
  });

  const [deleteItem] = useMutation(DELETE_ITEM_MUTATION, {
    update(_, data) {
      setAdded(false);
    },
    onError(err) {
      console.log('errors: ', err.graphQLErrors[0]);
      // setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: { listID: listValueID, itemID: id }
  });

  const watchedButton = user ? (
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
              viewBox="0 0 24 24"
              fill="none"
              stroke="#f87666"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
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
                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
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
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
            />
          </svg>
        </span>
      </div>
    </Link>
  );

  return (
    <li className="mark-watched py-0.5 mr-5 text-white box-border list-none">
      {QueryValues.loading ? <MoonLoader loading color="#000" size={20} /> : watchedButton}
    </li>
  );
}

WatchedBtn.propTypes = {
  listToAdd: PropTypes.string.isRequired
};

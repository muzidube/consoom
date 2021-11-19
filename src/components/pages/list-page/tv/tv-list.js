import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import ShowTV from './tv-info';

import UserListQuery from '../../../../graphql/queries/use-get-user-lists';
import { AuthContext } from '../../../../context/auth';

export default function TVList() {
  const { user } = useContext(AuthContext);
  const { type, title } = useParams();

  const [userInfo, setUserInfo] = useState(user ? user.id : '');
  const [listValueItems, setListValueItems] = useState([]);

  const listFor = title;
  const listTypeFor = type;

  const QueryValues = UserListQuery(userInfo, listFor, listTypeFor);

  useEffect(() => {
    setUserInfo(user ? user.id : '');
    if (user && !QueryValues.loading) {
      setListValueItems(QueryValues.data.getUserList.items);
    }
  });

  return (
    <div className="hero max-w-screen-xl flex flex-wrap w-full box-border mx-auto px-auto pt-7 justify-center">
      <div className="pl-10 flex flex-wrap w-full">
        {listValueItems.length > 0 && listValueItems.map((tv) => <ShowTV key={tv.id} {...tv} />)}
      </div>
    </div>
  );
}

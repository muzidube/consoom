import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

import ShowGame from './game-info';
import UserListQuery from '../../../../graphql/queries/use-get-user-lists';
import { AuthContext } from '../../../../context/auth';

export default function GamesList() {
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
      <div className="user-media-list mx-auto grid gap-5 grid-cols-2 xl:grid-cols-7 lg:grid-cols-5 md:grid-cols-4">
        {listValueItems.length > 0 &&
          listValueItems.map((game) => (
            <ShowGame key={game.id} {...game} released={game.addedAt.split('T')[0]} />
          ))}
      </div>
    </div>
  );
}

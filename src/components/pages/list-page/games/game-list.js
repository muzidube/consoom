import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import ShowGame from './game-info';

import ListForPageQuery from '../../../../graphql/queries/use-get-list-for-page';
import { AuthContext } from '../../../../context/auth';

export default function GamesList() {
  const { user } = useContext(AuthContext);
  const { type, title } = useParams();
  console.log(type, title);

  const [userInfo, setUserInfo] = useState(user ? user.id : '');
  const [listValueItems, setListValueItems] = useState([]);

  const listFor = title;
  const listTypeFor = type;

  const QueryValues = ListForPageQuery(userInfo, listFor, listTypeFor);
  console.log(QueryValues);

  useEffect(() => {
    setUserInfo(user ? user.id : '');
    if (user && !QueryValues.loading) {
      setListValueItems(QueryValues.data.getListForPage.items);
    }
  });

  return (
    <div className="hero max-w-screen-xl flex flex-wrap w-full box-border mx-auto px-auto pt-7 justify-center">
      <div className="pl-10 flex flex-wrap w-full">
        {listValueItems.length > 0 &&
          listValueItems.map((game) => <ShowGame key={game.id} {...game} />)}
      </div>
    </div>
  );
}

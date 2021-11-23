import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import ShowBook from './book-info';

import ListForPageQuery from '../../../../graphql/queries/use-get-list-for-page';
import { AuthContext } from '../../../../context/auth';

export default function BooksList() {
  const { user } = useContext(AuthContext);
  const { type, title } = useParams();
  console.log(type, title);

  const [userInfo, setUserInfo] = useState(user ? user.id : '');
  const [listValueItems, setListValueItems] = useState([]);

  const listFor = title;
  const listTypeFor = type;

  const QueryValues = ListForPageQuery(userInfo, listFor, listTypeFor);

  useEffect(() => {
    setUserInfo(user ? user.id : '');
    if (user && !QueryValues.loading) {
      setListValueItems(QueryValues.data.getListForPage.items);
    }
  });

  return (
    <div className="hero max-w-screen-xl flex flex-wrap w-full box-border mx-auto px-auto pt-7 justify-center">
      <div className="user-media-list mx-auto grid gap-5 grid-cols-2 xl:grid-cols-7 lg:grid-cols-5 md:grid-cols-4">
        {listValueItems.length > 0 &&
          listValueItems.map((book) => (
            <ShowBook key={book.id} {...book} author={book.addedAt.split('T')[0]} />
          ))}
      </div>
    </div>
  );
}

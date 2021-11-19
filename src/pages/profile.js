/* eslint-disable*/
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Hero from '../components/pages/profile-page/hero';
import Header from '../components/header';

import Thing from '../components/Thing';
import MovieLists from '../components/pages/profile-page/movie-lists';
import TVLists from '../components/pages/profile-page/tv-lists';
import BookLists from '../components/pages/profile-page/book-lists';
import GameLists from '../components/pages/profile-page/game-lists';

const FETCH_LISTS_QUERY = gql`
  {
    getLists {
      id
      name
      type
      username
      createdAt
      itemCount
      items {
        id
        addedAt
      }
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

export default function Profile() {
  const { loading, error, data } = useQuery(FETCH_LISTS_QUERY);

  return (
    <div className="bg-gray-background">
      <Header />
      <main className="w-full flex flex-wrap content-start justify-center bg-white mt-16 mx-auto justify-center items-center box-border">
        {/* {loading ? (
          <h1>Loading lists...</h1>
        ) : (
          data.getLists &&
          data.getLists.map((list) => (
            <div>
              <Thing key={list.id} list={list} />
            </div>
          ))
        )} */}
        <Hero />
        <MovieLists />
        <TVLists />
        <BookLists />
        <GameLists />
      </main>
    </div>
  );
}

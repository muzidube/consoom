import gql from 'graphql-tag';

const CREATE_DEFAULT_LISTS = gql`
  mutation createList($name: String!, $type: String!) {
    MoviesWatchlist: createList(name: "Movies - Watchlist", type: "Movies") {
      id
      name
      type
      user
      username
    }
    MoviesFavourites: createList(name: "Movies - Favourites", type: "Movies") {
      id
      name
      type
      user
      username
    }
    MoviesWatched: createList(name: "Movies - Watched", type: "Movies") {
      id
      name
      type
      user
      username
    }
    TVWatchlist: createList(name: "TV - Watchlist", type: "TV") {
      id
      name
      type
      user
      username
    }
    TVFavourites: createList(name: "TV - Favourites", type: "TV") {
      id
      name
      type
      user
      username
    }
    TVWatched: createList(name: "TV - Watched", type: "TV") {
      id
      name
      type
      user
      username
    }
    BooksToRead: createList(name: "Books - To Read", type: "Books") {
      id
      name
      type
      user
      username
    }
    BooksFavourites: createList(name: "Books - Favourites", type: "Books") {
      id
      name
      type
      user
      username
    }
    BooksRead: createList(name: "Books - Read", type: "Books") {
      id
      name
      type
      user
      username
    }
    GamesToPlay: createList(name: "Games - To Play", type: "Games") {
      id
      name
      type
      user
      username
    }
    GamesFavourites: createList(name: "Games - Favourites", type: "Games") {
      id
      name
      type
      user
      username
    }
    GamesPlayed: createList(name: "Games - Played", type: "Games") {
      id
      name
      type
      user
      username
    }
    MusicToListen: createList(name: "Music - To Listen", type: "Music") {
      id
      name
      type
      user
      username
    }
    MusicFavourites: createList(name: "Music - Favourites", type: "Music") {
      id
      name
      type
      user
      username
    }
    MusicListened: createList(name: "Music - Listened", type: "Music") {
      id
      name
      type
      user
      username
    }
  }
`;

export default CREATE_DEFAULT_LISTS;

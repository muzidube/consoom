// import { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
// import Book from '../../../dashboard/book-row/Book';

// export default function ShowBook({ id }) {
//   const [book, setBook] = useState([]);

//   useEffect(() => {
//     const fetchBookDetails = async () => {
//       try {
//         const response = await fetch(
//           `https://api.thebookdb.org/3/book/${id}?api_key=0375f153b709c9b683ba71849a873283&language=en-US`
//         );
//         const json = await (await response).json();
//         setBook(json);
//       } catch (error) {
//         console.log('Error: ', error);
//       }
//     };

//     fetchBookDetails();
//   }, []);

//   return <book key={book.id} {...book} />;
// }

// ShowBook.propTypes = {
//   id: PropTypes.number.isRequired
// };

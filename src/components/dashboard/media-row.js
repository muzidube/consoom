import { useContext } from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
import UserContext from '../../context/user';
import * as ROUTES from '../../constants/routes';

export default function MediaRow() {
  return (
    <div className="container movie-container flex justify-center">
      <div className="movie">
        <img src="/images/Consume-Big.jpg" alt="imagess" />
        <div className="movie-info">
          <h3>Movie Title: QWith the beast that has secx with everyaonsd s</h3>
          <span className="green">9.8</span>
        </div>
        <div className="overview">
          Lorem ipsum asdhashd hadsjkhaf haskdjfh ajkdahs hdjks hfdkjhs ajkdhf khkajsdjhfads khaskjd
          hfkajhskdjf hkjasdhf hkdjhkasjhdf hk fhka sjkdhf hk kh
        </div>
      </div>
      <div className="movie">
        <img src="/images/Consume-Big.jpg" alt="imagess" />
        <div className="movie-info">
          <h3>Movie Title</h3>
          <span className="green">9.8</span>
        </div>
        <div className="overview">
          Lorem ipsum asdhashd hadsjkhaf haskdjfh ajkdahs hdjks hfdkjhs ajkdhf khkajsdjhfads khaskjd
          hfkajhskdjf hkjasdhf hkdjhkasjhdf hk fhka sjkdhf hk kh
        </div>
      </div>
      <div className="movie">
        <img src="/images/Consume-Big.jpg" alt="imagess" />
        <div className="movie-info">
          <h3>Movie Title</h3>
          <span className="green">9.8</span>
        </div>
        <div className="overview">
          Lorem ipsum asdhashd hadsjkhaf haskdjfh ajkdahs hdjks hfdkjhs ajkdhf khkajsdjhfads khaskjd
          hfkajhskdjf hkjasdhf hkdjhkasjhdf hk fhka sjkdhf hk kh
        </div>
      </div>
      <div className="movie">
        <img src="/images/Consume-Big.jpg" alt="imagess" />
        <div className="movie-info">
          <h3>Movie Title</h3>
          <span className="green">9.8</span>
        </div>
        <div className="overview">
          Lorem ipsum asdhashd hadsjkhaf haskdjfh ajkdahs hdjks hfdkjhs ajkdhf khkajsdjhfads khaskjd
          hfkajhskdjf hkjasdhf hkdjhkasjhdf hk fhka sjkdhf hk kh
        </div>
      </div>
      <div className="movie">
        <img src="/images/Consume-Big.jpg" alt="imagess" />
        <div className="movie-info">
          <h3>Movie Title</h3>
          <span className="green">9.8</span>
        </div>
        <div className="overview">
          Lorem ipsum asdhashd hadsjkhaf haskdjfh ajkdahs hdjks hfdkjhs ajkdhf khkajsdjhfads khaskjd
          hfkajhskdjf hkjasdhf hkdjhkasjhdf hk fhka sjkdhf hk kh
        </div>
      </div>
    </div>
  );
}

// MediaRow.propTypes = {
//   movie: PropTypes.shape({
//     poster_path: PropTypes.string.isRequired,
//     release_date: PropTypes.string.isRequired,
//     title: PropTypes.string.isRequired,
//     vote_average: PropTypes.number.isRequired
//   })
// };

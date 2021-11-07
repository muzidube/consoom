import PropTypes from 'prop-types';

export default function Thing({ list: { id, name, type } }) {
  return (
    <div>
      <p>{id}</p>
      <p>{name}</p>
      <p>{type}</p>
    </div>
  );
}

Thing.propTypes = {
  list: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

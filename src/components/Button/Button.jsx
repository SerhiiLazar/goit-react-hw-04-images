import PropTypes from 'prop-types';
import css from './Button.module.css';

const Button = ({ loadMoreFetch }) => {
  return (
    <button className={css.Button} type="button" onClick={loadMoreFetch}>
      Load More
    </button>
  );
};

export default Button;

Button.propTypes = {
  loadMoreFetch: PropTypes.func.isRequired,
};
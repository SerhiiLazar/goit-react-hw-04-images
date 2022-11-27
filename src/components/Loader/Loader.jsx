import PropTypes from 'prop-types';
import { ThreeCircles } from 'react-loader-spinner';
import css from './Loader.module.css';
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export const Loader = ({ isLoading }) => {
  return (
    <div className={css.wrapper}>
      <ThreeCircles
        height="100"
        width="100"
        color="#4fa94d"
        wrapperStyle={{}}
        wrapperClass=""
        visible={isLoading}
        ariaLabel="three-circles-rotating"
        outerCircleColor=""
        innerCircleColor=""
        middleCircleColor=""
      />
    </div>
  );
};

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
}
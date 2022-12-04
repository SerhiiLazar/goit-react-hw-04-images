import PropTypes from 'prop-types';
import { useState } from 'react';
import { toast } from 'react-toastify';
import css from './Searchbar.module.css';

export function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const hendleSubmit = event => {
    event.preventDefault();

    if (query === '') {
      toast('You have not entered anything, please enter!');
      return;
    }
    onSubmit(query);
    event.target.reset();
  };

  const hendleChange = event => {
    const { name, value } = event.target;
    setQuery({ [name]: value.trim() });
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={hendleSubmit}>
        <button type="submit" className={css.SearchFormButton}>
          <span className={css.SearchFormButtonLabel}></span>
        </button>

        <input
          className={css.SearchFormInput}
          type="text"
          name="query"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          // value={query}
          onChange={hendleChange}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

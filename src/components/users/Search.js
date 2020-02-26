import React, { useState, useContext } from 'react';
import GitHubContext from '../../context/github/GithubContext';
import AlertContext from '../../context/alert/AlertContext';

const Search = () => {
  const githubContext = useContext(GitHubContext);
  const alertContext = useContext(AlertContext);

  const [text, setText] = useState('');

  const handleChange = e => setText(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();
    if (text === '') {
      alertContext.setAlert('Please enter something', 'light');
    } else {
      githubContext.searchUsers(text);
      setText('');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className='form'>
        <input
          type='text'
          name='text'
          placeholder='Search Users...'
          value={text}
          onChange={handleChange}
        />
        <input
          type='submit'
          value='Search'
          className='btn btn-dark btn-block'
        />
      </form>
      {githubContext.users.length > 0 && (
        <button
          className='btn btn-light btn-block'
          onClick={githubContext.clearUsers}>
          Clear
        </button>
      )}
    </div>
  );
};

export default Search;

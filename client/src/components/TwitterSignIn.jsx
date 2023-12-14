// React component
import React, { useEffect } from 'react';
import { RequestTwitter } from '../services/UserService';
import { useNavigate } from 'react-router-dom';

function TwitterSignIn() {
  const navigate = useNavigate();

  useEffect(() => {
    const cookie = decodeURIComponent(document.cookie);
    if (cookie) {
      navigate('/');
    }
  }, [])

  const handleClick = async () => {
    try {
      await RequestTwitter();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex bg-black justify-center items-center h-screen flex-col">
      <img className='w-96 h-96' src='https://img.freepik.com/free-vector/new-twitter-logo-x-icon-black-background_1017-45427.jpg'/>
    <button
      type="button"
      onClick={handleClick}
      className="text-white bg-blue-400 hover:bg-blue-300 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
    >
      Sign in with Twitter
    </button>
  </div>
  );
}

export default TwitterSignIn;

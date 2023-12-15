import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logOutApi, postTweet, profileData } from '../services/UserService';
import {message} from 'antd'
import axiosPublic from '../api/api';



function HomePage() {

  const navigate = useNavigate();
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [cookie, setCookie] = useState('');
  const [logout,setLogout]=useState(false)
  const [text,setText]=useState('')
  const [data,setData]=useState({})

  useEffect(() => {
    
      try {
        const cookie = decodeURIComponent(document.cookie);
        if (!cookie) {
          navigate('/login');
        }
        const cookieValue = cookie.split("=")[1];
        console.log(cookieValue);
        setCookie(cookieValue);

        if(!logout){
          
        axiosPublic.post('/profile',{cookieValue}).then((response)=>{
          console.log(response.data);
          setImage(response.data.image);
          setName(response.data.name);
          setUsername(response.data.username);
          
        }).catch((error)=>{
          console.log(error)
          throw(error);
        })
        }
      }catch(error){
        console.log(error)
      }
   

  }, [logout]);



  const handleLogout = () => {
    logOutApi(cookie).then((resposne) => {
      document.cookie = 'twitterAccessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
      console.log(resposne)
      setLogout(true)
      message.success("Logged out successfully")
    }).catch((err) => {
      console.log(err)
    }) 
  }

  const handlePost = async(event) => {
    event.preventDefault();
    if (text.trim() === '') {
      message.error('text cannot be empty');
      return;
    }
    
    console.log(text);
    await postTweet({ text, cookie }).then((response) => {
      message.success("Message posted succesfully");
      setText('');
    }).catch((error) => {
      console.log(error)
    })

  }
  console.log(name,username)



  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-200 flex-col">
      <h1 className="text-blue-900 text-xl font-bold m-3">Welcome {name || 'Guest'}</h1>

      <div className="w-full max-w-sm bg-blue-900 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="flex justify-end px-4 pt-4">
          <a
            onClick={handleLogout}
            className="inline-flex items-center px-4 py-2 text-sm font-medium cursor-pointer text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
          >
            Logout
          </a>
        </div>
        <div className="flex flex-col items-center p-6">
          <img
            className="w-24 h-24 mb-3 rounded-full shadow-lg"
            src={image || "data:image/png;base64,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"}
            alt="Bonnie image"
          />
          <h5 className="mb-1 text-xl font-medium text-white dark:text-white">{name || 'Name'}</h5>
          <span className="text-sm text-white dark:text-gray-400">{username || 'Username'}</span>
          <div className="flex flex-col mt-4 md:flex-row md:items-center">
            <input
              name='message'
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type a message..."
              className="w-full md:w-auto mb-2 md:mb-0 md:mr-2 px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:focus:ring-gray-700"
            />
            <button
              onClick={handlePost}
              className="w-full md:w-auto px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Post Tweet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;

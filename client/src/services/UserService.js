import axios from "../api/api";

export const RequestTwitter = async () => {
  try {
    await axios.get('/home')
      .then(response => {
        window.location.href = response.data.Url;
      })
      .catch(error => {
        console.error(error);
        throw(error);
      });
  } catch (error) {
    throw error;
  }
};

export const profileData=async(cookieValue)=>{
  console.log(cookieValue)
  await axios.post('/profile',{cookieValue}).then((response)=>{
    return response.data
  }).catch((error)=>{
    console.log(error)
    throw(error);
  })
}

export const logOutApi=async(cookie)=>{
  
  await axios.post('/logout',{cookie}).then((response)=>{
    return response.data
  }).catch((error)=>{
    console.log(error)
    throw(error);
  })
}

export const postTweet=async(data)=>{
  await axios.post('/post',data).then((response)=>{
    return response.data;
  }).catch((error)=>{
    console.log(error)
    throw(error);
  })
}



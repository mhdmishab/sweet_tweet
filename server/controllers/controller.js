import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();


const clientId = process.env.CLIENT_ID;
const redirectUri = process.env.REDIRECT_URI;
const codeVerifier= process.env.CODE_VERIFIER;


export const TwitterAccessTokenGenerator = async (req, res,next) => {
  try {
    const authorizationCode = req.query.code
    const data = new URLSearchParams();
    data.append('code', authorizationCode);
    data.append('grant_type', 'authorization_code');
    data.append('client_id', clientId);
    data.append('redirect_uri', redirectUri);
    data.append('code_verifier', codeVerifier);

    const response = await axios.post('https://api.twitter.com/2/oauth2/token', data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    const accessToken = response.data.access_token;
    res.clearCookie('twitterAccessToken')
    res.cookie('twitterAccessToken', accessToken);
    
  //  try{
  //   const responseUser = await axios.get('https://api.twitter.com/2/users/me?user.fields=profile_image_url', {
  //     headers: {
  //       'Authorization': `Bearer ${accessToken}`,
  //       }
  //     })
  //     console.log(responseUser)
  //   const image=responseUser.data.data.profile_image_url;
  //   const name=responseUser.data.data.name;
  //   const username=responseUser.data.data.username;
  //   console.log(image,name,username)
  //   res.redirect(`http://localhost:5173/?image=${image}&name=${name}&username=${username}`);
  //  }catch(err){console.log(err)}
   res.redirect(`http://localhost:5173/`);
  } catch (error) {
    console.error(error.message);
    next();
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
export const Home=(req,res,next)=>{
 try {
  console.log("home here")
  const Url=`https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=tweet.write%20tweet.read%20users.read&state=state&code_challenge=${codeVerifier}&code_challenge_method=plain`
  res.json({
    Url
  })
 } catch (error) {
  console.error(error.message);
  next(error);
 }
 
};
export const profileData=async(req,res,next)=>{
  try {
    const cookie=req.body.cookieValue;
    console.log(cookie);
    const responseUser = await axios.get('https://api.twitter.com/2/users/me?user.fields=profile_image_url', {
      headers: {
        'Authorization': `Bearer ${cookie}`,
        }
      })
    console.log(responseUser)
    const image=responseUser.data.data.profile_image_url;
    const name=responseUser.data.data.name;
    const username=responseUser.data.data.username;
    console.log(image,name,username)

    res.json({
      image,
      name,
      username
    })

  } catch (error) {
    console.error(error.message);
    next(error);
   }
  
}
export const logOut=async(req,res,next)=>{
  try {
    const cookie=req.body.cookie;
    console.log(cookie);
    res.clearCookie('twitterAccessToken');
    const response = await axios.post(
      'https://api.twitter.com/2/oauth2/revoke',
      `token=${cookie}&client_id=${clientId}&token_type_hint=access_token`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    console.log(response)
    res.json({
    message:"loggedout succesfully"
  })
    
  } catch (error) {
    console.error(error.message);
    next(error);
   }
  
}
export const postTweet=async(req,res,next)=>{
  try {
    console.log(req.body);
    const {text,cookie}=req.body;
    await axios.post('https://api.twitter.com/2/tweets',{text:text}, {
      headers: {
        'Authorization': `Bearer ${cookie}`,
        }
      });
      res.json({
        messageInfo:"Message posted succesfully"
      })
  } catch (error) {
    console.error(error.message);
    next(error);
   }
}

import express from "express";
import {  Home, TwitterAccessTokenGenerator, logOut, postTweet, profileData } from "../controllers/controller.js";
const route=express.Router();

route.get('/twitter',TwitterAccessTokenGenerator)
route.get('/home',Home)
route.post('/profile',profileData)
route.post('/logout',logOut)
route.post('/post',postTweet)


export default route;
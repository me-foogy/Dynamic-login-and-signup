import express from "express";
import {addUser,checkUser, checkUserName} from './controller.js'

const auth = express.Router();

auth.post('/signup', addUser);
auth.post('/login', checkUser); 
auth.post('/usernamecheck', checkUserName);

export default auth;
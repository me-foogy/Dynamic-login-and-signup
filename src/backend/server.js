import express from 'express';
const app= express();
import cors from 'cors';
import databseConnection from './dbSetup.js';
import auth from './routes.js';

app.use(cors());
app.use(express.json());
app.use('/auth', auth);

databseConnection();
app.listen(5000, ()=>{
    console.log('server is listening to port 5000');
})
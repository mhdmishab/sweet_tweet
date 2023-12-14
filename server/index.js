// server.mjs
import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import route from './routes/route.js';
import cors from 'cors';


const app = express();
const PORT = 5000;


// Middleware
app.use(morgan('dev'));
app.use(cookieParser());
app.use(cors());
app.use(express.json());


// Routes

app.use('/api',route);
app.use((err,req,res,next)=>{
  console.error(err.stack);
  res.status(500).send('Something went wrong!')
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

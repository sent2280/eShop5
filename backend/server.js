import express from 'express';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
// import products from './data/products.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import path from 'path';
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT;
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;

connectDB();

const app = express();

// app.get('/api/products', (req, res) => {
//   res.json(products);
// });

// app.get('/api/products/:id', (req, res) => {
//     const productObj = products.find((p)=>p._id === req.params.id);
//     res.json(productObj);
//   });

 //// app.use('/api/products',productRoutes);

 // Configure CORS to allow requests from a specific origin (replace with your client's origin).
const corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Add the HTTP methods you need.
  };
  
app.use(cors(corsOptions));
 app.use(express.json());
 app.use(express.urlencoded({extended: true}));
 app.use(cookieParser());

 app.use('/api/products', productRoutes);
 app.use('/api/users',userRoutes);
 app.use('/api/orders',orderRoutes);
 app.use('/api/upload',uploadRoutes);

 app.get('/api/config/paypal',(req,res)=>
    res.send({clientId: PAYPAL_CLIENT_ID})
 )

 const __dirname = path.resolve();
 app.use('/uploads',express.static(path.join(__dirname, '/uploads')));

 
 if(process.env.NODE_ENV === 'production'){
  // const __dirname = path.resolve();
  // app.use('/uploads',express.static('/var/data/uploads'));
   app.use(express.static(path.join(__dirname, '/frontend/build')));

   app.get('*',(req,res)=>
   res.sendFile(path.resolve(__dirname,'frontend','build','index.html')));
 } else {  
 app.get('/', (req, res) => {
   res.send("API running....")
});
 }



 app.use(notFound);
app.use(errorHandler);


app.listen(port, () => 
console.log(`Server running on port ${port}`));
// const http = require('http');

// const app = http.createServer((req,res)=>{
//     console.log("request: ",req);
//     if(req.url === '/' || req.url === 'GET'){
//         res.end(`<h1>Day la Home</h1>`)
//     }
//     if(req.url === '/products' || req.url === 'GET'){
//         res.end(`<h1>Day la products</h1>`)
//     }
//     res.end(`<h1>Hello world</h1>`)
// });

import express from "express";
import dotenv from "dotenv";
import  router  from "../src/routes"
import mongoose from "mongoose";
import cors from 'cors'


// gọi hàm express

const app = express();
dotenv.config();
const { PORT,DB_URL } = process.env;
// middleware sử dụng để dịnh dạng json
app.use(cors());
app.use(express.json());
mongoose.connect(`${DB_URL}`).then(()=>{
  console.log("first connection")
})



app.use("/api",router)



app.listen(PORT, () => {
  console.log(`server is running on ${PORT} !`);
});

// Khi chay json-server khong duoc,thi them npx truoc cau lenh chay json-server -w db.json

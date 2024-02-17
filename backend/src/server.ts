import * as dotenv from 'dotenv';
dotenv.config();
import express from "express";
import cors from "cors";
//import { sample_foods, sample_tags, sample_users } from "./data";
import foodRouter from './routers/food.router';
import userRouter from "./routers/user.router";
import orderRouter from './routers/order.router';
import employeeRouter from "./routers/employee.router"
import { dbConnect } from './configs/database.config';
import path from 'path';
import { log } from 'console';

dbConnect();

const url = process.env.MONGO_URI || ''

const app = express();
//localhost:4200
app.use(express.json())
app.use(cors({
    credentials:true,
    origin: '*',
}));

app.use("/api/foods",foodRouter)
app.use("/api/users",userRouter)
app.use("/api/orders",orderRouter)
app.use("/api/employees",employeeRouter)


// app.get("/api/foods",(req, res) => {
//     res.send(sample_foods)
// })

// app.get("/api/foods/search/:searchTerm", (req, res) =>{
//     const searchTerm = req.params.searchTerm;
//     const foods = sample_foods
//     .filter(food => food.name.toLowerCase().includes(searchTerm.toLowerCase()));
//     res.send(foods);
// })

// app.get("/api/foods/tags", (req,res) => {
//     res.send(sample_tags);
// })

// app.get("/api/foods/tag/:tagname",(req, res) => {
//     const tagName = req.params.tagname;
//     const foods = sample_foods.filter(food => food.tags?.includes(tagName));
//     res.send(foods);
// })

// app.get("/api/foods/:foodId", (req, res) => {
//     const foodId = req.params.foodId;
//     const food = sample_foods.find(food => food.id == foodId)
//     res.send(food);
// })

// app.post("/api/users/login",(req, res) =>{
//     const {email, password} = req.body;
//     const user = sample_users.find(user => user.email === email && user.password === password);

//     if(user){
//         res.send(generateTokenResponse(user))
//     }else{
//         res.status(400).send("User name or password is not valid!")
//     }
// })

// const generateTokenResponse = (user:any)=>{
//     const token = jwt.sign({
//         email:user.email, isAdmin:user.isAdmin
//     },"someRandomtext",{
//         expiresIn:"30d"
//         });
//     user.token = token;
//     return user;
// }

app.use(express.static(path.join(__dirname,('/../../front-end'))));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/../../front-end/src/index.html'))
    console.log(__dirname);
    
})



const port = 5000;
app.listen(port, ()=>{
    console.log(`Server is running on ${port}`);
    console.log(url);
    
})


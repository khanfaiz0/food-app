import { Router } from "express";
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import { sample_users } from "../data";
import { User, UserModel } from "../models/user.model";
import bcrypt from 'bcryptjs'

const router = Router();

router.get("/seed", asyncHandler(
    async (req, res) => {
        const usersCount = await UserModel.countDocuments();
        if (usersCount > 0) {
            res.send("Seed is already done!");
            return;
        }

        await UserModel.create(sample_users);
        res.send("Seed Is Done!");
    }
))


router.post("/login", asyncHandler(
    async (req, res) => {
      const {email, password} = req.body;
      const user = await UserModel.findOne({email});

    
       if(user  && (await bcrypt.compare(password,user.password))) {
        res.send(generateTokenResponse(user));
       }
       else{
         res.status(400).send("Username or password is invalid!");
       }
    
    }
  ))

  router.post('/register',asyncHandler(
    async(req,res)=>{
        const {name, email, password, address} =req.body
        const user = await UserModel.findOne({email});
        if(user){
            res.status(400).send("User already exist!");
            return;
        }

        const encryptedPassword = await bcrypt.hash(password,10);

        const newUser:User ={
            name,
            email:email.toLowerCase(),
            password:encryptedPassword,
            address,
            isAdmin:false
        }

        const dbUser = await UserModel.create(newUser);

        res.send(generateTokenResponse(dbUser));
    }
  ))

// router.post("/login", asyncHandler(
//     async (req, res) => {
//         console.log("faizanaaa");
        
//         const { email, password } = req.body;
//         console.log("faizan");
        
//         const user = UserModel.findOne({ email, password });
//         console.log(user)
//         //const user = sample_users.find(user => user.email === email && user.password === password);

//         if (user) {
//             res.send(generateTokenResponse(user))
//         } else {
//             res.status(400).send("User name or password is not valid!")
//         }
//     }))

const generateTokenResponse = (user: any) => {
    const token = jwt.sign({
        id: user.id,  email: user.email, isAdmin: user.isAdmin
    }, process.env.JWT_SECRET!, {
        expiresIn: "30d"
    });
    return {
        id: user.id,
        email: user.email,
        name: user.name,
        address: user.address,
        isAdmin: user.isAdmin,
        token: token
      };
}

export default router;



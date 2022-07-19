import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from "mongoose";
import User from '../models/user.js';

export const signin = async (req,res) =>{
    const {email, password} = req.body;

    try{
        const existingUser = await User.findOne({ email });

        if(!existingUser) return res.status(404).json({message:"User doesn't exist."});

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if(!isPasswordCorrect) return res.status(400).json({message:"Invalid credentials."});

        const token = jwt.sign({email: existingUser.email, id: existingUser._id}, 'test', {expiresIn:'1h'})

        res.status(200).json({result:existingUser, token});
    }catch(error){
        res.status(500).json({message:'Something went wrong.'});
    }
}

export const updateUser = async (req,res) =>{
    const { _id,email,password } = req.body;
    try{
        let newInfo = req.body;
        if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No user with that id');
        const user = await User.findOne({ _id });
        if (user.email !== email){
            const existingUser = await User.findOne({ email });
            if(existingUser) return res.status(400).json({message:"Email already in use."});
        }
        if (user.password !== password){
            const hashedPassword = await bcrypt.hash(password, 12);
            newInfo = {...newInfo,password:hashedPassword}
        }
        const updatedUser = await User.findByIdAndUpdate(_id, {...newInfo, _id}, {new: true });
        const token = jwt.sign({email: updatedUser.email, id: updatedUser._id}, 'test', {expiresIn:'1h'});
        res.status(200).json({result:updatedUser, token});
    }
    catch(error){
        res.status(500).json({message:'Something went wrong.'});
    }
}
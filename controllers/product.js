import mongoose from "mongoose";
import Product from "../models/product.js";

import History from "../models/history.js";


export const getProducts = async (req,res)=>{
    try{
        const productList = await Product.find({},'drugname drugcompany image').limit(20);

        res.status(200).json(productList);
    } catch (error){
        res.status(404).json({ message: error.message});
    }
}

export const getProductDetail = async (req,res)=>{
    try {
        const {id} = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No product with that id');
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(404).json({ message: error.message});
    }
}


export const buyProduct = async (req,res)=>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No product with that id');
    const product = await Product.findById(id);
    const{drugname,drugcompany,stocks} = product;
    const newOrder = new History({drugname,drugcompany,stocks, createdAt: new Date().toISOString()});
    await newOrder.save();
    product.stocks -= 1;
    const updatedProduct = await Product.findByIdAndUpdate(id,product,{new:true});
    res.json(updatedProduct)
}


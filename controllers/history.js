import History from "../models/history.js";


export const createOrder = async (req,res) =>{
    const order = req.body;
    const newOrder = new History({...order, createdAt: new Date().toISOString()});
    try{
        await newOrder.save();

        res.status(201).json(newOrder);
    } catch (error){
        res.status(409).json({message: error.message});
    }
}

export const getOrders = async (req,res) =>{
    try{
        const orderHistory = await History.find();
        res.status(200).json(orderHistory)
    } catch (error){
        res.status(404).json({ message: error.message});
    }
}
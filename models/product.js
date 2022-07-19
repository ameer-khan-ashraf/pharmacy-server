import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
    drugname:{ type: String, required: true },
    drugcompany:{ type: String, required: true },
    price:{ type:Number, required: true},
    stocks: {type: Number, required:true},
    image:{type:String},
    drugcode: {type: String}
})


export default mongoose.model("Product", productSchema , "ecomproducts");
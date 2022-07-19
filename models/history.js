import mongoose from 'mongoose';

const historySchema = mongoose.Schema({
    drugname:{ type: String, required: true },
    drugcompany:{ type: String, required: true },
    stocks: {type: Number, required:true},
    createdAt: {
        type: Date,
        default: new Date()
    },
    buyerid:{ type: String}
})


export default mongoose.model("History", historySchema);